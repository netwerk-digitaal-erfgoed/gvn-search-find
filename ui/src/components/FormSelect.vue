<template>
  <select>
    <option>{{ select.label }}</option>
    <option v-for="(option, key) in select.options" :key="key">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
defineProps({
  select: Object
});
</script>

<style scoped>
select {
  max-width: 20%;
  font-size: 1.35rem;
}

select:last-child {
  margin-right: 0;
}
</style>
