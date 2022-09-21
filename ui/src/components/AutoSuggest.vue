<template>
  <div>
    <vue3-simple-typeahead
      id="typeahead_id"
      placeholder="Of zoek"
      :items="['One','Two','Three']"
      :minInputLength="1"
    >
    </vue3-simple-typeahead>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    options: String
  });

  function arrayOfOptions() {
    return props.options;
  }
</script>