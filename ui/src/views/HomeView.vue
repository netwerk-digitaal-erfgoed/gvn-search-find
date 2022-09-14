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
import { searchStore } from '@/stores/search.store';

import { ref, onMounted } from 'vue';

const store = searchStore();
const formSetup = ref({});

onMounted(() => {
  formSetup.value = store.fetchMockData();
});
</script>
