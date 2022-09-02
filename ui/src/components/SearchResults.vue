<template>
  <div class="search-results">
    <h2>Resultaten</h2>
    <div
      v-for="(result, index) in results"
      :key="index"
      class="search-result-card"
    >
      <figure class="search-result-card-image">
        <img
        :src="result.image"
        :alt="result.title">
      </figure>
      <div class="search-result-card-body">
        <h3>{{ result.title }}</h3>
        <h4>{{ result.creator }}</h4>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  results: Object
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
}

.search-result-card-image {
  max-width: 20%;
  height: auto;
  margin-right: 2rem;
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
