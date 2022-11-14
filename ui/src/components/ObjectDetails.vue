<template>
  <div class="object-image">
    <img :src="heritageObject.image.contentUrl" alt="" />
  </div>
  <div class="object-details-container">
    <div class="object-metadata">
      <h1>{{ heritageObject.name }}</h1>
      <table>
        <tr>
          <th>Instelling</th>
          <td>{{ heritageObject.publisher }}</td>
        </tr>
        <tr>
          <th>Datum</th>
          <td>{{ heritageObject.dateCreated }}</td>
        </tr>
        <tr>
          <th>Afgebeelde locatie</th>
          <td>
            <span
              v-for="(location, l) in heritageObject.contentLocation" 
              :key="l"
            >
              {{ location }}
            </span>
          </td>
        </tr>
        <tr>
          <th>Licentie media</th>
          <td>{{ heritageObject.image.license }}</td>
        </tr>
        <tr>
          <th>Type media</th>
          <td>{{ heritageObject.image.encodingFormat }}</td>
        </tr>
      </table>
    </div>
    <div class="object-metadata">
      <h2>Gerelateerde termen</h2>
      <table v-for="(term, t) in relatedTerms" :key="t">
        <tr>
          <th>Termen</th>
          <td>
            <button class="white small">
              {{ term.prefLabel }}
            </button>
          </td>
        </tr>
        <tr v-if="term.broader">
          <th>Bredere termen</th>
          <td>
            <button
              v-for="(broader, index) in term.broader"
              :key="index"
              class="white small"
            >
              {{ broader.prefLabel }}
            </button>
          </td>
        </tr>
        <tr v-if="term.narrower">
          <th>Nauwere termen</th>
          <td>
            <button
              v-for="(narrower, index) in term.narrower"
              :key="index"
              class="white small"
            >
              {{ narrower.prefLabel }}
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div class="object-buttons">
      <button class="white" @click.prevent="backToSearchResults()">
        Zoek opnieuw
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import { searchStore } from '@/stores/search.store';

import { Terms } from '../../../sdk/build/terms';

const store = searchStore();
const router = useRouter();
const terms = new Terms();

const relatedTerms = ref([]);

const heritageObject = computed(() => {
  return store.getSelectedObject();
});

function termLookUp(lookup) {
  lookup.forEach(async (term) => {
    await terms
      .getById({ id: term })
      .then((result) => {
        relatedTerms.value.push(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}

function backToSearchResults() {
  console.log('backToSearchResults');
  // clear current object
  router.push({
    name: 'home'
  });
}

onMounted(() => {
  console.log(heritageObject.value.id);
  termLookUp(heritageObject.value.additionalType);
});
</script>

<style scoped>
.object-details-container {
  background: var(--vt-c-brown-soft);
  margin-top: -3rem;
  padding: 5rem;
}

.object-image,
.object-metadata,
.object-buttons {
  margin: 0 auto 3rem auto;
  font-size: 1.5rem;
  width: 60vw;
  z-index: 5;
}

.object-image {
  width: 75vw;
  display: flex;
  justify-content: center;
  margin-bottom: -3rem;
}

.object-image img {
  display: block;
  border: 3px solid var(--vt-c-brown-soft);
}

.object-metadata table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 5rem;
}

.object-metadata table tr th,
.object-metadata table tr td {
  border-bottom: 1px solid black;
  padding: 0.5rem 0;
  text-align: left;
  vertical-align: top;
}

.object-metadata table tr th {
  font-weight: bold;
  width: 25%;
}

.object-buttons {
  text-align: right;
}
</style>
