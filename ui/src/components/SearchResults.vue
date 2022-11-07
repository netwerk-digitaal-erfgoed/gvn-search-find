<template>
  <div class="search-results">
    <h2>{{ numberOfResults }} resultaten</h2>
    <ul>
      <li
        v-for="(result, index) in searchResults"
        :key="index"
        class="search-result-card"
        @click="showObjectDetails(result)"
      >
        <div class="search-result-card-image">
          <img
            v-if="result.image.thumbnail.contentUrl"
            :src="result.image.thumbnail.contentUrl"
            alt=""
          />
        </div>
        <div class="search-result-card-body">
          {{ result.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { searchStore } from '@/stores/search.store';

const store = searchStore();
const router = useRouter();

const props = defineProps({
  searchResults: Array
});

const numberOfResults = computed(() => {
  return props.searchResults?.length;
});

function showObjectDetails(object: object) {
  store.setSelectedObject(object);
  router.push({
    name: 'object'
  });
}
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

.search-result-card {
  text-align: left;
  background: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--vt-c-orange);
  cursor: pointer;
  page-break-inside: avoid;
}

.search-result-card-image {
  width: 100%;
  height: auto;
  background: var(--vt-c-orange);
}

.search-result-card-image img {
  width: 100%;
  display: block;
  margin-bottom: 1rem;
}

.search-result-card-body {
  font-weight: bold;
}
</style>
