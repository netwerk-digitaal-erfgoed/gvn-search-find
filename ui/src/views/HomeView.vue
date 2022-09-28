<template>
  <div>
    <SearchForm :form-setup="formSetup" @show-results="callbackShowResults" />
    <SearchResults :show-results="showResults" />
    <div><router-link to="/search">Zoekformulier #2</router-link><br/><br/></div>
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
