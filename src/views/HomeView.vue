<template>
  <div>
    <SearchForm :form-setup="formSetup" @show-results="callbackShowResults" />
    <LoadingSpinnerBar v-if="isLoading" variant="bar" class="no-results" />
    <template v-if="searchResults.length > 0">
      <SearchResults
        :search-results="resultsForPage"
        :number-of-results="searchResults.length"
        ref="searchResultsContainer"
      />
      <div v-if="numberOfPages > 1" class="pagination-wrapper">
        <PaginationComponent
          v-model="currentPage"
          :numberOfPages="numberOfPages"
        />
      </div>
    </template>
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
import LoadingSpinnerBar from '@/components/LoadingSpinnerBar.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

import { ref, computed } from 'vue';
import { searchStore } from '@/stores/search.store';

import { HeritageObjects } from '@/sdk/heritage-objects';

const store = searchStore();
const heritageObjects = new HeritageObjects();

const formSetup = ref({});

const selectedTerm = ref({});
const searchResults = ref([]);

const isLoading = ref(false);

const currentPage = ref(1);
const perPage = ref(24);
const searchResultsContainer = ref();

const numberOfPages = computed(() => {
  if (searchResults?.value.length > 0) {
    return Math.ceil(searchResults?.value.length / perPage.value);
  }
  return 1;
});

const resultsForPage = computed(() => {
  window.scrollTo(0, 0);
  if (searchResults?.value.length > 0) {
    const start = (currentPage.value - 1) * perPage.value;
    const end = perPage.value * currentPage.value;
    return searchResults.value.slice(start, end);
  }
  return [];
});

async function callbackShowResults(selected: { id: string }) {
  console.log('callbackShowResults', selected);

  selectedTerm.value = selected;
  searchResults.value = [];
  isLoading.value = true;
  store.setSelectedTerm(selected); // use store for now, might be a temp solution

  // search
  await heritageObjects
    .searchByTerm({ term: selectedTerm.value.id })
    .then((result) => {
      searchResults.value = result.results;
      isLoading.value = false;
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

.pagination-wrapper {
  margin: 0 auto 3rem auto;
  width: 75vw;
  display: flex;
  justify-content: center;
}
</style>
