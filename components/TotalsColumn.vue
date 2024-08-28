<template>
  <div>
    <span v-if="currency=='TSH'">{{ totals.tshTotal }}</span>
    <span v-else>{{ totals.usdTotal }}</span>
  </div>
</template>

<script setup>


const props = defineProps({
  particulars: {
    type: Array,
    required: true,
    default:[]
  },
  currency: {
    type: String,
    required: true,
    default: "TSH"
  }
})

function calculateTotals(particulars) {
  return particulars.reduce((totals, particular) => {
    if (particular.currency === 'TSH') {
      totals.tshTotal += particular.amount;
    } else if (particular.currency === 'USD') {
      totals.usdTotal += particular.amount;
    }
    return totals;
  }, { tshTotal: 0, usdTotal: 0 });
}


const totals = computed(() => {
  if (props.particulars.length > 0) {
    return calculateTotals(props.particulars);
  }else{
  return { tshTotal: 0, usdTotal: 0 };
  }
});
</script>