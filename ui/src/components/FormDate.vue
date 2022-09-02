<template>
  vanaf
  <input
    type="date"
    :value="fromDate"
    @input="$emit('update:fromDate', $event.target.value)"
  />
  tot
  <input
    type="date"
    :value="toDate"
    @input="$emit('update:toDate', $event.target.value)"
  />
</template>

<script setup>
defineProps(['fromDate', 'toDate'])
defineEmits(['update:fromDate', 'update:toDate'])
</script>