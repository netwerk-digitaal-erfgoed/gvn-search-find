<template>
  <div class="search-results">
    <h2>{{ numberOfResults }} resultaten</h2>
    <ul>
      <li v-for="(result, index) in searchResults" :key="index">
        <SearchResult :object="result" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import SearchResult from '@/components/SearchResult.vue';

const props = defineProps({
  searchResults: Array
});

const numberOfResults = computed(() => {
  return props.searchResults?.length;
});
</script>

<style scoped>
.search-results {
  width: 75vw;
  padding: 0;
  margin: 0 auto;
}

.search-results ul {
  list-style: none;
  column-count: 3;
  padding: 0;
  margin: 0;
  margin-bottom: 3rem;
}
</style>
