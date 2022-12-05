<template>
  <div class="search-results">
    <h2>
      {{ numberOfResults }}
      <span v-if="numberOfResults > 1">objecten</span>
      <span v-else>object</span>
    </h2>
    <ul>
      <li v-for="(result, index) in searchResults" :key="index">
        <SearchResult :object="result" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import SearchResult from '@/components/SearchResult.vue';

export interface Image {
  thumbnail: ImageDetails;
}

export interface ImageDetails {
  contentUrl: string;
}

export interface Result {
  id: string;
  name: string;
  image: Image;
}

export interface Props {
  searchResults: Array<Result>;
  numberOfResults: number;
}

withDefaults(defineProps<Props>(), {
  numberOfResults: 0
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
