<template>
    <tr>

      <td class="px-4 py-2"> 
        <span v-if="item.taxInvoiceId">{{ item?.taxInvoice?.consignment?.bookingNumber?? "Consignment missing" }}</span>
        <span v-else-if="item.debitNoteId">its a note</span>
        <span v-else class="italic">user unavailable</span>
      </td>

      <td class="px-4 py-2">
        <span v-if="item?.taxInvoice?.generatedBy">{{ item?.taxInvoice?.generatedBy?.firstName}} {{item.taxInvoice.generatedBy?.lastName }}</span>
        <span v-else-if="item?.debitNote?.generatedBy">{{ item?.debitNote?.generatedBy?.firstName}} {{item.debitNote.generatedBy?.lastName }}</span>
        <span v-else class="italic">deleted user</span>
      </td>

      <td class="px-4 py-2">  
        <span v-if="!item.taxInvoiceId" >Debit Note</span>
        <span v-else class="px-4 py-2">Invoice</span>
      </td>

      <td class="px-4 py-2">{{ convertDateFormat(item.CreatedAt) }}</td>
      
      <td class="flex items-center gap-6 px-4 py-2">
        <span 
          class="text-[#292a5e] text-sm font-medium hover:text-black duration-300 cursor-pointer"
          @click="previewClicked(item)"
        >Preview Invoice</span>
        <!-- Uncomment the below span if you want to enable the edit functionality
        <span 
          class="text-[#d4af37] text-sm font-medium hover:text-black duration-300 cursor-pointer"
          @click="loadEditExpenseForm(item)"
        >Edit</span>
        -->
        <span 
          class="text-red-600 text-sm font-medium hover:text-black duration-300 cursor-pointer"
          @click="deleteClicked"
        >Delete</span>
      </td>
    </tr>
  </template>
  
  <script setup>
  import { toRefs } from 'vue';
  
  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['delete-clicked', 'preview-invoice', 'preview-debit-note'])
  const { item } = toRefs(props);

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

function previewInvoiceClicked(doc){
if(doc){
    invoiceToPreview.value = doc
}
showDebitNotePreview.value = true
}

function deleteClicked(){
    emit("delete-clicked")
}
  
function previewClicked(){
  if(props.item.taxInvoiceId){
    emit("preview-invoice", props.item.ID)
  }else{
    emit("preview-debit-note", props.item.ID)
  }
    
}
</script>
  

  