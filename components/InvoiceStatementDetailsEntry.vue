<template>
  <tr v-for="item in items" class="border-b grey-200">

    <td class="px-4 py-2"> 
      <span >{{ props.date.split("-").reverse().join("/") }}</span>
    </td>

    <td class="px-4 py-2">
      <span v-if="item.invoiceNumber"> invoice</span>
      <span v-else>debit note</span>
    </td>

    <td class="px-4 py-2">  
      <span v-if="item.invoiceNumber"> {{ item.invoiceNumber }} </span>
      <span v-else> {{ item.debitNoteNumber }} </span>
    </td>

    

    <td class="px-4 py-2">
      <span v-if="item.particulars?.length>0"> {{ item.particulars[0].purpose }} </span>
    </td>


    <td class="px-4 py-2">
      <span v-if="item.particulars?.length>0"> {{ item.particulars.reduce((a,b)=> a + b.amount, 0) }} </span>
    </td>

    <td class="px-4 py-2">
        <!-- <TotalsColumn v-if="item?.taxInvoiceId" :particulars="item?.taxInvoice?.particulars" currency="TSH"/>
        <TotalsColumn v-else-if="item?.debitNoteId" :particulars="item?.debitNote?.particulars" currency="TSH"/>
      <span v-else class="italic">Tsh total unavailable</span> -->
    </td>

    <td class="px-4 py-2">
      <!-- <TotalsColumn v-if="item?.taxInvoiceId" :particulars="item?.taxInvoice?.particulars" currency="USD"/>
        <TotalsColumn v-else-if="item?.debitNoteId" :particulars="item?.debitNote?.particulars" currency="USD"/>
      <span v-else class="italic">USD total unavailable</span> -->
    </td>
    
    
    <td class="flex items-center gap-6 px-4 py-2">
      <span 
        class="text-[#292a5e] text-sm font-medium hover:text-black duration-300 cursor-pointer"
        @click="previewClicked()"
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
  items: {
    type: Object,
    required: true
  },
  date:{
    type:String
  }
});


const emit = defineEmits(['delete-clicked', 'preview-invoice', 'preview-debit-note'])
// const { items } = toRefs(props);       

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
if(props.items  ){
  emit("preview-invoice", props.items[0].ID)
}else{
  emit("preview-debit-note", props.items[0].ID)
}
  
}


onMounted(() => {
  });
</script>


