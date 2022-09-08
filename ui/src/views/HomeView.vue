<template>
  <div>
    <SearchForm
      :form-setup="formSetup"
    />
    <!--<SearchResults :results="result" />-->
  </div>
</template>

<script setup lang="ts">
import SearchForm from '@/components/SearchForm.vue';
import SearchResults from '@/components/SearchResults.vue';

import { ref, onMounted } from 'vue';
import * as mockFormData from '@/static/searchFormData.js'; 

// const result = ref([]);
const formSetup = ref([]);

function fetchData() {
  formSetup.value = mockFormData.default; // Mock data for dropdowns 
}

onMounted(() => {
  fetchData();
});
</script>
