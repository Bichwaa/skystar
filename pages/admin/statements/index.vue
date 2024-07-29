<template>
    <div class="flex flex-wrap sm:flex-row gap-8">
      <div class="w-full">
        <div class="mb-4">
          <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
            <div class="mb-6 flex items-center justify-between">
              <div class="flex items-center justify-between w-full">
                <div class="flex flex-col">
                  <p class="ml-2 font-bold text-black text-2xl w-full text-center"> 
                    <span >Statements</span>
                  </p>
                </div>
                  <div class="group">
                    <!-- <button class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300" @click="showCreateStatementForm=true">
                      <IconsAddIcon class="h-7 w-7 cursor-pointer"/>
                      <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                      Add Statement
                    </span>
                    </button> -->
                  </div>
                
              </div>
              
            </div>
            <div class="m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:grid-rows-9 gap-8 overflow-y-scroll">
             
              <div class="lg:col-span-4 flex items-center gap-8">
                <StatementCard 
                  v-for="val,i in taxInvoices" 
                  :doc="val" 
                  :key="i" 
                  :show-download="true"
                  :show-delete="true"
                  type="xls"
                  @download="downloadStatementClicked"
                  @delete="loadDeleteStatementDialog"
                  />
              </div>
              
            </div>
  
          </div>
        </div>
      </div>
      <FormsStatementUploadForm v-if="showCreateStatementForm"  @close="handleCreateStatementClosed"/>
      <FormsCreateDebitNoteForm v-if="showCreateDebitNoteForm"  @close="handleCreateDebitNoteformClosed"/>
      <DeleteDialog v-if="showDeleteStatementDialog" entity="Statement" :loading="deleteInProgress" @proceed="deleteStatement" @close="showDeleteStatementDialog=false"/>
      <DeleteDialog 
        v-if="showDeleteDebitNoteDialog" 
        entity="Debit Note" 
        :loading="deleteInProgress" 
        @proceed="deleteDebitNote" 
        @close="showDeleteDebitNoteDialog=false"/>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';


  // definePageMeta({
  //   middleware: 'permissions',
  //   permissions: ['can-read-invoices']
  // });

  const { $axios } = useNuxtApp()
  
  const taxInvoices = ref([]);
  const debitNotes = ref([]);
  const invoicesActive = ref(true)
  
  const currentDate = new Date();
  
  
  //CRUD SHIT
  const showCreateStatementForm = ref(false)
  const showEditStatementForm = ref(false)
  const showDeleteStatementDialog = ref(false)
  const taxInvoiceToEdit = ref({});
  const statementToDelete = ref(0);
  const deleteInProgress = ref(false)

  

  async function getStatements(){
    try {
      const response = await $axios.get('/api/statements');
      taxInvoices.value = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      taxInvoices.value = null; // Set items to an empty array or handle error as needed
    }
  }

  async function getDebitNotes(){
    try {
      const response = await $axios.get('/api/debit-note');
      debitNotes.value = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      debitNotes.value = null; // Set items to an empty array or handle error as needed
    }
  }

  async function downloadStatementClicked(doc){
    if (doc) {
      try {
        const res = await $axios.get(`/api/statements/download/${doc.filename}`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', doc.filename); // or set a different filename if needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading the file:', error);
        alert('Error downloading the file. Please try again.');
      }
    }
  }

  function previewDebitNoteClicked(doc){
    if(doc){
      debitNoteToPreview.value = doc
    }
    showDebitNotePreview.value = true
  }

  function loadDeleteDebitNote(doc){
    if(doc){
      debitNoteToDelete.value = doc
    }
    showDeleteDebitNoteDialog.value = true
  }

  function taxInvoicePreviewClosed(invoice){
    showTaxInvcPreview.value = false
  }
  
  function debitNotePreviewClosed(){
    showDebitNotePreview.value = false
  }
  function loadEditStatementForm(doc){
    taxInvoiceToEdit.value = doc;
    showEditStatementForm.value = true
  }
  
  async function handleCreateStatementClosed(payload){
    showCreateStatementForm.value=false;
    if(payload!=undefined){
      await getStatements()
    }
  }
  
  async function handleCreateDebitNoteformClosed(payload){
    showCreateDebitNoteForm.value=false;
    if(payload!=undefined){
      await getDebitNotes()
    }
  }
  
  function loadDeleteStatementDialog(doc){
    statementToDelete.value = doc;
    showDeleteStatementDialog.value = true
  }
  
  async function deleteStatement(){
    deleteInProgress.value = true
    const res = await $axios.delete(`/api/statements/delete/${statementToDelete.value}`);
    console.log(res)
    if(res.status==200 || 201){
        await getStatements()
        showDeleteStatementDialog.value = false;
    }else{
        console.log(res.statusText)
    }
  }

  async function deleteDebitNote(){
    deleteInProgress.value = true
    const res = await $axios.delete(`/api/debit-note/${debitNoteToDelete.value}`);
    console.log(res)
    if(res.status==200 || 201){
        await getDebitNotes()
        showDeleteDebitNoteDialog.value = false;
    }else{
        console.log(res.statusText)
    }
  }
  
  
  onMounted(async () => {
    await getStatements()
    await getDebitNotes()
  });
  
  </script>