<template>
  <div>
    <vue3-simple-typeahead
      id="typeahead_id"
      placeholder="Of zoek"
      :items="['One', 'Two', 'Three']"
      :min-input-length="1"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  options: String
});
</script>
