<template>
  <div>
    <select>
      <option>{{ select.label }}</option>
      <option v-for="(option, key) in select.options">{{ option }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    select: Object
  });
</script>

<style>
  .search-select select {
    max-width: 200px;
    font-size: 1.35rem;
  }
</style>