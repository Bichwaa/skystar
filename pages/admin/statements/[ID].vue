<template>
    <div class="flex flex-wrap sm:flex-row gap-8">
      <div class="w-full rounded-2xl bg-white p-4 shadow-lg">
        <div class="details-wrapper">
          <div class="flex flex-col gap-2">
            <div class="summary flex flex-col gap-1 items-end px-4">
              <span>Date: {{ convertDateFormat(new Date()) }}</span>
              <br>
            <span>Opening Balance: </span>
            <span>Invoiced Amount:{{ statement.openingBalance }} </span>
            <span>Amount Paid: {{ statement?.amountPaid }}</span>
            <span>Balance Due: {{ statement.openingBalance - statement.amountPaid }}</span>
            </div>
            <div class="address summary flex flex-col gap-1 p-4">
              <span>Bill To; </span>
              <span> {{ statement.customer?.fullName }}. </span>
              <!-- <span> </span> -->
              <div class="flex justify-between items-center">
                <span class="block"> P O Box: {{ statement.customer?.address }}. </span>

                <div>
                  <button  type="submit" @click.prevent="openSubmitPaymentForm" 
                    class="flex items-center justify-center py-2 px-3 text-xs rounded-lg bg-[#292a5e] min-w-[150px] text-white font-medium hover:bg-gray-300 hover:text-[#292a5e] disabled:bg-gray-600 duration-300">
                    <span v-if="!formLoading">Add Payment</span>
                    <Loader v-else size="small" class="h-4 w-4"/>
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="m-auto block">
              <table class="w-full divide-y divide-gray-200">
                <thead class="bg-gray-100">
                  <tr class="">
                    <th class="px-4 py-2 text-left">Date</th>
                    <th class="px-4 py-2 text-left">Transaction</th>
                    <th class="px-4 py-2 text-left">Number</th>
                    <th class="px-4 py-2 text-left">Description</th>
                    <th class="px-4 py-2 text-left">Amount</th>
                    <th class="px-4 py-2 text-left">Payment</th>
                    <th class="px-4 py-2 text-left">Balance</th>
                    <th class="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <InvoiceStatementDetailsEntry 
                    v-for="(statements, date) in groupedDocs" 
                    :items="statements" 
                    :date = "date"
                    :key="date"
                    @delete-clicked="loadDeleteStatementDialog(item.ID)"
                    @preview-invoice="loadTaxInvoicePreview(item.taxInvoice)"
                    @preview-debit-note="loadDebitNotePreview(item.debitNote)"
                    />
                    <tr v-for="p in  statement.payments">
                      <td class="px-4 py-2"> 
                        <!-- {{ extractDocs(statement).length > 0 ? extractLatestUpdateDate(extractDocs(statement)): 0 }} -->
                          {{ convertDateFormat(p.UpdatedAt) }}
                       </td>
                      <td class="px-4 py-2 font-bold"> Payment received </td>
                      <td class="px-4 py-2"></td>
                      <td class="px-4 py-2">{{ p.for }}</td>
                      <td class="px-4 py-2"></td>
                      <td class="px-4 py-2 font-bold"> 
                        <!-- {{ statement?.payments ? statement.payments.reduce((x, payment) => x + payment.invoicedAmount, 0) : 0 }}  -->
                        {{ p.invoicedAmount }}
                      </td>
                      <td class="px-4 py-2"></td>
                      <td class="flex items-center gap-6 px-4 py-2">
                        <span 
                          class="text-[#292a5e] text-sm font-medium hover:text-black duration-300 cursor-pointer invisible">not preview.</span>
                        <span 
                          class="text-red-600 text-sm font-medium hover:text-black duration-300 cursor-pointer"
                          @click="loadDeletePaymentDialog(p.ID)"
                        >Delete</span>
                      </td>
                    </tr>
                </tbody>
              </table>
        </div>
      </div>
      <DeleteDialog 
        v-if="showDeleteStatementDialog" 
        entity="Statement" 
        :loading="deleteInProgress" 
        @proceed="deleteStatement" 
        @close="closeDeleteDialog"/>

        <DeleteDialog 
        v-if="showDeletePaymentDialog" 
        entity="Payment" 
        :loading="deleteInProgress" 
        @proceed="deletePayment" 
        @close="closeDeleteDialog"/>

        <TaxInvoicePreview v-if="showTaxInvcPreview" :doc="taxInvoiceToPreview" :entries="taxInvoiceToPreview.particulars" @close="taxInvoicePreviewClosed"/>
        <DebitNotePreview v-if="showDNotePreview" :doc="debitNoteToPreview" :entries="debitNoteToPreview.particulars" @close="debitNotePreviewClosed"/>
        <FormsAddPaymentForm 
          v-if="showPaymentForm" 
          @close="formClosed"
          :invoices="statement.taxInvoices"
          :debit-notes="statement.debitNotes"
          />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';


  // definePageMeta({
  //   middleware: 'permissions',
  //   permissions: ['can-read-invoices']
  // });

  const { $axios } = useNuxtApp()
  
  const statement = ref({});
  const debitNotes = ref([]);
  const invoicesActive = ref(true)
  
  const currentDate = new Date();
  
  
  //CRUD SHIT
  const showPaymentForm = ref(false)
  const showTaxInvcPreview = ref(false)
  const showDNotePreview = ref(false)
  const showDeleteStatementDialog = ref(false)
  const showDeletePaymentDialog = ref(false)
  const taxInvoiceToPreview = ref({});
  const debitNoteToPreview = ref({});
  const statementToDelete = ref(0);
  const paymentToDelete = ref(0);
  const deleteInProgress = ref(false)

  function extractDocs(statement){
    let invoices = statement?.taxInvoices || []
    let dNotes = statement?.debitNotes || []
    return [...invoices, ...dNotes]
  }

  function extractLatestUpdateDate(docs){
    // const docs = extractDocs(statement);
    console.log(docs)
    let currentDate = docs[0].UpdatedAt;

    return convertDateFormat(currentDate)

  }

  const groupedDocs = computed(() => {
    let newDocs = {}
    // let invoices = statement.value?.taxInvoices || []
    // let dNotes = statement.value?.debitNotes || []
    // let docs =  [...invoices, ...dNotes]
    let docs = extractDocs(statement.value)
    docs.forEach(doc => {
      const date = doc.CreatedAt.substring(0, 10)
      if(newDocs[date]){
      newDocs[date].push(doc)
      }else{
        newDocs[date] = [doc]
      }
    });
    return newDocs
  })

  function taxInvoicePreviewClosed(invoice){
    showTaxInvcPreview.value = false
  }
  function debitNotePreviewClosed(){
    showDNotePreview.value = false
  }

  function loadTaxInvoicePreview(id){
    if(id){
      taxInvoiceToPreview.value = id
    }
    showTaxInvcPreview.value = true
  }

  function loadDebitNotePreview(id){
    if(id){
      debitNoteToPreview.value = id
    }
    showDNotePreview.value = true;
  }

  function openSubmitPaymentForm(){
    showPaymentForm.value=true
  }

  async function getStatement(){
    const route = useRoute()
    // console.log(route.path.split("/")[3])
    try {
      const response = await $axios.get(`/api/statements/${route.path.split("/")[3]}`);
      statement.value = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      statement.value = null; // Set items to an empty array or handle error as needed
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

  function convertDateFormat(dateString) {
  // Create a new Date object from the input string
  const inputDate = new Date(dateString);

  // Format the date as "DDD/MM/YY"
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

  
  
  function loadDeleteStatementDialog(id){
    statementToDelete.value = id;
    showDeleteStatementDialog.value = true
  }

  function loadDeletePaymentDialog(id){
    paymentToDelete.value = id;
    showDeletePaymentDialog.value = true
  }
  
  function closeDeleteDialog(){
    deleteInProgress.value = false;
    showDeleteStatementDialog.value=false;
  }
  async function deleteStatement(id){
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


  async function deletePayment(){
    deleteInProgress.value = true
    const res = await $axios.delete(`/api/payments/delete/${paymentToDelete.value}`);
    console.log(res)
    if(res.status==200 || 201){
        await getStatement()
        showDeletePaymentDialog.value = false;
    }else{
        console.log(res.statusText)
    }
  }

  async function formClosed(){
    await getStatement()
    showPaymentForm.value=false;
  }

  
  
  onMounted(async () => {
    await getStatement()
  });
  
  </script>