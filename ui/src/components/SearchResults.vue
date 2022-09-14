<template>
  <div v-if="showResults" class="search-results">
    <h2>Resultaten</h2>
    <div v-for="n in 10" :key="n" class="search-result-card">
      <div class="search-result-card-image"></div>
      <div class="search-result-card-body">Resultaat #{{ n }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  showResults: Boolean
});
</script>

<style scoped>
.search-results {
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.search-result-card {
  text-align: left;
  background: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  border: 1px solid var(--vt-c-orange);
}

.search-result-card-image {
  width: 10rem;
  height: 10rem;
  height: auto;
  margin-right: 2rem;
  background: var(--vt-c-orange);
}

.search-result-card-image img {
  width: 100%;
  display: block;
}

.search-result-card-body h3,
.search-result-card-body h4 {
  margin-bottom: 0;
}
</style>
