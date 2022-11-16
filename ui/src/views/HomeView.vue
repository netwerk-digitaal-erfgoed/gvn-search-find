<template>
  <div>
    <SearchForm :form-setup="formSetup" @show-results="callbackShowResults" />
    <SearchResults
      v-if="searchResults.length > 0"
      :search-results="searchResults"
    />
    <p
      v-else-if="searchResults.length === 0 && selectedTerm.length > 1"
      class="no-results"
    >
      Er zijn geen resultaten.
    </p>
  </div>
</template>

<script setup lang="ts">
import SearchForm from '@/components/SearchForm.vue';
import SearchResults from '@/components/SearchResults.vue';

import { ref } from 'vue';

import { HeritageObjects } from '../../../sdk/build/heritage-objects';

const heritageObjects = new HeritageObjects();

const formSetup = ref({});

const selectedTerm = ref([]);
const searchResults = ref([]);

async function callbackShowResults(selected: []) {
  selectedTerm.value = selected;
  searchResults.value = [];

  // search
  await heritageObjects
    .searchByTerm({ term: selectedTerm.value.id })
    .then((result) => {
      searchResults.value = result.results;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
</script>

<style scoped>
.no-results {
  margin: 0 auto 3rem auto;
  width: 75vw;
}
</style>
