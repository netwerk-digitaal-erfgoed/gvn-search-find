<template>
  <div class="object-image">
    <img :src="heritageObject?.image.contentUrl" alt="" />
  </div>
  <div class="object-details-container">
    <div class="object-metadata">
      <h1>{{ heritageObject?.name }}</h1>
      <p class="intro">{{ heritageObject?.description }}</p>
      <table>
        <tr>
          <th>Instelling</th>
          <td>
            <a :href="heritageObject?.publisher" target="_blank">{{
              heritageObject?.publisher
            }}</a>
          </td>
        </tr>
        <tr>
          <th>Datering</th>
          <td>{{ heritageObject?.dateCreated }}</td>
        </tr>
        <tr>
          <th>Locatie</th>
          <td>
            <span
              v-for="(location, l) in heritageObject?.contentLocation"
              :key="l"
            >
              {{ location }}
            </span>
          </td>
        </tr>
        <tr>
          <th>Licentie media</th>
          <td>
            <a :href="heritageObject?.image.license" target="_blank">{{
              labelRights(heritageObject?.image.license)
            }}</a>
          </td>
        </tr>
        <tr>
          <th>Type media</th>
          <td>{{ labelMedia(heritageObject?.image.encodingFormat) }}</td>
        </tr>
        <tr>
          <th>Termen</th>
          <td>
            <button
              v-for="(term, t) in relatedTerms"
              :key="t"
              class="white small"
              @click="submitSearchTerm(term.id)"
            >
              {{ term.prefLabel }}
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div
      class="object-related"
      v-if="relatedTerms?.length > 0 && relatedObjects?.length > 0"
    >
      <h2>Meer {{ relatedTerms[0].prefLabel }}</h2>
      <div class="related-objects">
        <SearchResult
          v-for="(object, t) in relatedObjects"
          :key="t"
          :object="object"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, type Ref } from 'vue';
import { useRouter } from 'vue-router';

import { Terms } from '../../../sdk/build/terms';
import { HeritageObjects } from '../../../sdk/build/heritage-objects';

import SearchResult from '@/components/SearchResult.vue';

const router = useRouter();
const terms = new Terms();
const heritageObjects = new HeritageObjects();
const relatedTerms: Ref<Array> = ref([]);
const relatedObjects: Ref<Array> = ref([]);

const props = defineProps({
  details: Object
});

const heritageObject = computed(() => {
  return props.details;
});

function termLookUp(lookup: object) {
  lookup.forEach(async (term: { id: string }) => {
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

function labelRights(statement: string) {
  switch (statement) {
    case 'https://rightsstatements.org/page/InC/1.0/':
      return 'In copyright';
    default:
      return statement;
  }
}

function labelMedia(typeOfMedia: string) {
  switch (typeOfMedia) {
    case 'image/jpeg':
      return 'Afbeelding';
    default:
      return typeOfMedia;
  }
}

async function getRelatedObjects(term: string) {
  await heritageObjects
    .searchByTerm({ term })
    .then((result) => {
      const objects = result.results.sort(() => 0.5 - Math.random()); // easy shuffling, could possibly be improved
      relatedObjects.value = objects.slice(0, 3); // max 3 related
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function submitSearchTerm(id: string) {
  router.replace({
    name: 'home',
    query: { query: encodeURIComponent(id) }
  });
}

onMounted(() => {
  if (heritageObject.value) {
    termLookUp(heritageObject.value.additionalType);
    getRelatedObjects(heritageObject.value.additionalType[0]);
  }
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
.object-buttons,
.object-related {
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

.object-metadata .intro {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.object-metadata table {
  font-size: 1rem;
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

.object-metadata table tr td button {
  margin-bottom: 0.5rem;
}

.object-buttons {
  text-align: right;
}

.related-objects {
  display: flex;
  gap: 1rem;
}

.related-objects :deep(.search-result-card) {
  max-width: 33%;
}
</style>
