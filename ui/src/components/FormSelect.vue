<template>
  <select
    :value="select"
    @input="$emit('update:select', { 'what': $event.target.value })"
  >
    <option 
      value="0"
    >
      {{ field.label }}
    </option>
    <option
      v-for="(option, index) in field.options"
      :key="index"
      :value="option.value"
    >
      {{ option.value }}
    </option>
  </select>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const props = defineProps({
    field: Object,
    fieldKey: String,
    select: Array
  });

  const isActive = ref('test');

  defineEmits(['update:select'])
</script>