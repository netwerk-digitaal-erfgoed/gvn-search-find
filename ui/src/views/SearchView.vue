<template>
  <div class="search-wrapper">
    <div class="search-input"><input type="text" name="query" placeholder="Ik ben op zoek naar" /></div>
    <div class="search-wrapper-form-results">
      <div class="search-wrapper-results">
        <SearchResults :show-results="showResults" />
      </div>
      <div class="search-wrapper-form">
        <SearchForm :form-setup="formSetup" @show-results="callbackShowResults" variant="traditional" />
      </div> 
    </div>   
  </div>
</template>

<script setup lang="ts">
import SearchForm from '@/components/SearchForm.vue';
import SearchResults from '@/components/SearchResults.vue';
import { searchStore } from '@/stores/search.store';

import { ref, onMounted } from 'vue';

const store = searchStore();
const formSetup = ref({});

const showResults = ref(true);

function callbackShowResults() {
  showResults.value = true;
}

onMounted(() => {
  formSetup.value = store.fetchMockData();
});
</script>

<style>
  .search-wrapper-form-results {    
    display: flex;
    justify-content: space-between;
  }

  .search-wrapper-form {
    width: 30%;
  }

  .search-wrapper-results {
    width: 65%;
  }

  input[type='text'] {
    width: 100%;
    margin-bottom: 3rem;
  }
</style>