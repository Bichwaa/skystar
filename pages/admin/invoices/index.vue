<template>
    <div class="flex flex-wrap sm:flex-row gap-8">
      <div class="w-full">
        <div class="mb-4">
          <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
            <div class="mb-6 flex items-center justify-between">
              <div class="flex items-center justify-between w-full">
                <div class="flex flex-col">
                  <p class="ml-2 font-bold text-black text-2xl w-full text-center"> 
                    <span v-if="invoicesActive">Invoices</span> 
                    <span v-else>Debit Notes</span>
                     List</p>
                </div>
                <!-- <DropDowner class="inline-flex flex-col gap-3 lg:mr-8">
                  <div class="group">
                    <button class="p-2 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300" @click="showCreateTaxInvoiceForm=true">
                      <IconsAddIcon class="h-7 w-7 cursor-pointer"/>
                      <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                      New Invoice
                    </span>
                    </button>
                  </div>

                  <div class="group">
                    <button class="p-2 mt-6 rounded-lg flex gap-4 items-center border border-gray-200 group-hover:bg-[#292a5e] duration-300" @click="showCreateDebitNoteForm=true">
                      <IconsAddIcon class="h-7 w-7 cursor-pointer"/>
                      <span class="text-sm text-[#292a5e] group-hover:text-white duration-700">
                      New Debit Note
                    </span>
                    </button>
                  </div>
                </DropDowner> -->
                
              </div>
              
            </div>
            <div class="m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:grid-rows-9 gap-8 overflow-y-scroll">
              <div class="sidemenu lg:col-span-1 row-span-full">
                <div class="submenu flex flex-col">
                  <span 
                    @click="()=>invoicesActive=true"
                    class="px-6 text-sm py-1 my-1 cursor-pointer"
                    :class="invoicesActive?'bg-gradient-to-r border-r-4 border-blue-500 from-white to-blue-100 text-blue-500':''"
                  >
                    INVOICES
                  </span>

                  <span 
                  @click="()=>invoicesActive=false"
                      class="px-6 text-sm py-1 my-1 cursor-pointer"
                      :class="!invoicesActive?'bg-gradient-to-r border-r-4 border-blue-500 from-white to-blue-100 text-blue-500':''"
                    >
                    DEBIT NOTES
                  </span>
                </div>
              </div>
              <div class="lg:col-span-4 grid grid-cols-4 gap-8">
                <DocumentCard 
                  v-if="invoicesActive" 
                  v-for="val,i in taxInvoices" 
                  :doc="val" 
                  :key="i" 
                  :show-delete="true"
                  :show-preview="true"
                  @preview="previewTaxInvoiceClicked"
                  @edit="loadEditTaxInvoiceForm"
                  @delete="loadDeleteTaxInvoiceDialog"
                  />
                <DocumentCard v-else 
                  v-for="val,i in debitNotes"  
                  :doc="val" 
                  :key="`key-${i}`" 
                  :show-delete="true"
                  :show-preview="true" 
                  @preview="previewDebitNoteClicked"
                  @delete="loadDeleteDebitNote"
                />
              </div>
              
            </div>
  
          </div>
        </div>
      </div>
      <TaxInvoicePreview v-if="showTaxInvcPreview" :doc="taxInvoiceToPreview" :entries="taxInvoiceToPreview.particulars" @close="taxInvoicePreviewClosed"/>
      <DebitNotePreview v-if="showDebitNotePreview" :doc="debitNoteToPreview" @close="debitNotePreviewClosed"/>
      <FormsCreateTaxInvoiceForm v-if="showCreateTaxInvoiceForm"  @close="handleCreateTaxInvoiceClosed"/>
      <FormsCreateDebitNoteForm v-if="showCreateDebitNoteForm"  @close="handleCreateDebitNoteformClosed"/>
      <DeleteDialog v-if="showDeleteTaxInvoiceDialog" entity="Tax Invoice" :loading="deleteInProgress" @proceed="deleteTaxInvoice" @close="showDeleteTaxInvoiceDialog=false"/>
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

  definePageMeta({
    middleware: 'permissions',
    permissions: ['can-read-invoices']
  });

  const { $axios } = useNuxtApp()
  
  const taxInvoices = ref([]);
  const debitNotes = ref([]);
  const invoicesActive = ref(true)
  
  const currentDate = new Date();
  
  
  //CRUD SHIT
  const showTaxInvcPreview = ref(false)
  const showDebitNotePreview = ref(false)
  const showCreateTaxInvoiceForm = ref(false)
  const showCreateDebitNoteForm = ref(false)
  const showEditTaxInvoiceForm = ref(false)
  const showDeleteTaxInvoiceDialog = ref(false)
  const showDeleteDebitNoteDialog = ref(false)
  const taxInvoiceToEdit = ref({});
  const taxInvoiceToDelete = ref(0);
  const debitNoteToDelete = ref(0);
  const deleteInProgress = ref(false)
  const taxInvoiceToPreview = ref({})
  const debitNoteToPreview = ref({})

  

  async function getTaxInvoices(){
    try {
      const response = await $axios.get('/api/tax-invoice');
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

  function previewTaxInvoiceClicked(doc){
    if(doc){
      taxInvoiceToPreview.value = doc
    }
    showTaxInvcPreview.value = true
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
  function loadEditTaxInvoiceForm(doc){
    taxInvoiceToEdit.value = doc;
    showEditTaxInvoiceForm.value = true
  }
  
  async function handleCreateTaxInvoiceClosed(payload){
    showCreateTaxInvoiceForm.value=false;
    if(payload!=undefined){
      await getTaxInvoices()
    }
  }
  
  async function handleCreateDebitNoteformClosed(payload){
    showCreateDebitNoteForm.value=false;
    if(payload!=undefined){
      await getDebitNotes()
    }
  }
  
  function loadDeleteTaxInvoiceDialog(docId){
    taxInvoiceToDelete.value = docId;
    showDeleteTaxInvoiceDialog.value = true
  }
  
  async function deleteTaxInvoice(){
    deleteInProgress.value = true
    const res = await $axios.delete(`/api/tax-invoice/${taxInvoiceToDelete.value}`);
    console.log(res)
    if(res.status==200 || 201){
        await getTaxInvoices()
        showDeleteTaxInvoiceDialog.value = false;
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
    await getTaxInvoices()
    await getDebitNotes()
  });
  
  </script>