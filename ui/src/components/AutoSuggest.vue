<template>
  <div class="autosuggest-wrapper">
    <input type="text" />
    <div v-if="suggestions?.length" class="autosuggest-list">
      <div
        v-for="(term, index) in suggestions"
        :key="index"
        @click.prevent="selectTerm(term)"
        class="autosuggest-list-item"
      >
        {{ term.prefLabel }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  suggestions: Array
});

const emit = defineEmits(['selectSearchTerm']);

function selectTerm(term: { term: string; prefLabel: string }) {
  console.log('selectSearchTerm', term);
  emit('selectSearchTerm', term);
}
</script>

<style scoped>
.autosuggest-wrapper {
  position: relative;
  width: 100%;
}

.autosuggest-wrapper input {
  border: 0;
  width: 100%;
  margin-bottom: 0;
}

.autosuggest-wrapper .autosuggest-list {
  position: absolute;
  top: 50px;
  background: #fff;
  width: 100%;
  z-index: 10;
  border: 1px solid #000;
  max-height: 50vh;
  overflow-y: auto;
}

.autosuggest-wrapper .autosuggest-list-item {
  padding: 0.25rem 1rem;
}

.autosuggest-wrapper .autosuggest-list-item:hover {
  background: #ccc;
  cursor: pointer;
}
</style>
