<template>
  <div>
    <!--<SearchForm
      :form-setup="formSetup"
    />-->
    <!--<SearchResults :results="result" />-->
    Ik ben op zoek naar informatie over ... Binnenkort!
  </div>
</template>

<script setup lang="ts">
import SearchForm from '@/components/SearchForm.vue';
import SearchResults from '@/components/SearchResults.vue';

import { ref, onMounted } from 'vue';
import * as mockFormData from '@/static/searchFormData.ts'; 

// const result = ref([]);
const formSetup = ref([]);

function fetchData() {
  formSetup.value = mockFormData.default; // Mock data for dropdowns 
}

onMounted(() => {
  fetchData();
});
</script>
