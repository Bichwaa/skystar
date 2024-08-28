<template>
  <tr>

    <!-- <td class="px-4 py-2"> 
      <span v-if="item.taxInvoiceId">{{ item?.taxInvoice?.consignment?.customer.fullName?? "Customer missing" }}</span>
      <span v-else-if="item.debitNoteId">{{ item?.debitNote?.consignment?.customer.fullName?? "Customer missing" }}</span>
      <span v-else class="italic">user unavailable</span>
    </td> -->

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

    

    <td class="px-4 py-2">
      <span v-if="item?.taxInvoice?.invoiceNumber">{{ item?.taxInvoice?.invoiceNumber}}</span>
      <span v-else-if="item?.debitNote?.debitNoteNumber">{{ item?.debitNote?.debitNoteNumber}} </span>
      <span v-else class="italic">deleted user</span>
    </td>


    <td class="px-4 py-2">
      <span v-if="item?.taxInvoice?.invoiceNumber">{{convertDateFormat(item?.taxInvoice?.CreatedAt) }}</span>
      <span v-else-if="item?.debitNote?.debitNoteNumber">{{ convertDateFormat(item?.debitNote?.CreatedAt)}} </span>
      <span v-else class="italic">date unavailable</span>
    </td>

    <td class="px-4 py-2">
        <TotalsColumn v-if="item?.taxInvoiceId" :particulars="item?.taxInvoice?.particulars" currency="TSH"/>
        <TotalsColumn v-else-if="item?.debitNoteId" :particulars="item?.debitNote?.particulars" currency="TSH"/>
      <span v-else class="italic">Tsh total unavailable</span>
    </td>

    <td class="px-4 py-2">
      <TotalsColumn v-if="item?.taxInvoiceId" :particulars="item?.taxInvoice?.particulars" currency="USD"/>
        <TotalsColumn v-else-if="item?.debitNoteId" :particulars="item?.debitNote?.particulars" currency="USD"/>
      <span v-else class="italic">USD total unavailable</span>
    </td>
    
    
    <td class="flex items-center gap-6 px-4 py-2">
      <span 
        class="text-[#292a5e] text-sm font-medium hover:text-black duration-300 cursor-pointer"
        @click="previewClicked(item)"
      >Preview Doc</span>
      <span 
        class="text-red-600 text-sm font-medium hover:text-black duration-300 cursor-pointer"
        @click="deleteClicked"
      >Delete</span>
    </td>
  </tr>
</template>

<script setup>

import { toRefs } from 'vue';
import { userStore } from '@/store';
  import { storeToRefs } from 'pinia';

  // Use the store
  const store = userStore();
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

// Initialize groupedStatements from the store
const { getGroupedStatements } = storeToRefs(store);

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


onMounted(() => {
    if (Object.keys(getGroupedStatements.value).length > 0) {
      statements.value = Object.values(getGroupedStatements.value).flat();
    }
  });
</script>


