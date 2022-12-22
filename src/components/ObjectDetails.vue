<template>
  <div class="object-image">
    <ProgressiveImage :src="heritageObject.image.contentUrl" />
  </div>
  <div class="object-details-container">
    <div class="object-metadata">
      <h1>{{ heritageObject.name }}</h1>
      <p class="intro">{{ heritageObject.description }}</p>
      <table>
        <tr>
          <th>Instelling</th>
          <td>
            {{ heritageObject.publisher.name }}
          </td>
        </tr>
        <tr>
          <th>Datering</th>
          <td>{{ heritageObject.dateCreated }}</td>
        </tr>
        <tr>
          <th>Locatie</th>
          <td>
            <span
              v-for="(location, l) in heritageObject.contentLocation"
              :key="l"
            >
              {{ location.name }}
            </span>
          </td>
        </tr>
        <tr>
          <th>Licentie media</th>
          <td>
            <a :href="heritageObject.image.license.id" target="_blank">{{
              heritageObject.image.license.name
            }}</a>
          </td>
        </tr>
        <tr>
          <th>Type media</th>
          <td>{{ labelMedia(heritageObject.image.encodingFormat) }}</td>
        </tr>
        <tr class="no-padding-bottom">
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
            <LoadingSpinnerBar v-if="isLoadingTerms" />
          </td>
        </tr>
      </table>
    </div>
    <div v-if="heritageObject.mainEntityOfPage" class="object-buttons">
      <a
        :href="heritageObject.mainEntityOfPage"
        target="_blank"
        class="button white small"
      >
        Bekijk dit object bij {{ heritageObject?.publisher.name }}
      </a>
    </div>
    <div
      class="object-related"
      v-if="relatedTerms?.length > 0 && relatedObjects?.length > 0"
    >
      <h2 v-if="related.length > 0">Alle {{ related[0].prefLabel }}</h2>
      <h2 v-else>Alle {{ relatedTerms[0].prefLabel }}</h2>
      <div class="related-objects">
        <SearchResult
          v-for="(object, t) in relatedObjects"
          :key="t"
          :object="object"
        />
      </div>
      <button
        v-if="related.length > 0"
        class="white small float-right"
        @click="submitSearchTerm(related[0].id)"
      >
        Alle {{ related[0].prefLabel }}
      </button>
      <button
        v-else
        class="white small float-right"
        @click="submitSearchTerm(relatedTerms[0].id)"
      >
        Alle {{ relatedTerms[0].prefLabel }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { ProgressiveImage } from 'vue-progressive-image';

import { Terms } from '@/sdk/terms';
import { HeritageObjects } from '@/sdk/heritage-objects';

import SearchResult from '@/components/SearchResult.vue';
import LoadingSpinnerBar from '@/components/LoadingSpinnerBar.vue';

export interface Image {
  contentUrl: string;
  license: License;
  encodingFormat: string;
}

export interface ImageAndThumbnail {
  contentUrl: string;
  license: License;
  encodingFormat: string;
  thumbnail: Image;
}

export interface Publisher {
  id: string;
  name: string;
}

export interface Location {
  id: string;
  name: string;
}

export interface License {
  id: string;
  name: string;
}

export interface HeritageObject {
  id: string;
  name: string;
  description: string;
  image: ImageAndThumbnail;
  publisher: Publisher;
  dateCreated: string;
  contentLocation: Location;
  mainEntityOfPage: string;
  additionalType: Array<string>;
}

export interface Props {
  details: HeritageObject;
  related?: Array<string>;
}

export interface RelatedTerm {
  id: string;
  prefLabel: string;
}

const props = withDefaults(defineProps<Props>(), {
  related: () => []
});

const { details, related } = toRefs(props);
const router = useRouter();
const terms = new Terms();
const heritageObjects = new HeritageObjects();
const relatedTerms = ref<Array<RelatedTerm>>([]);
const relatedObjects = ref<Array<HeritageObject>>([]);

const isLoadingTerms = ref(false);

const heritageObject = computed(() => {
  return details?.value;
});

async function termLookUp(lookup: object) {
  isLoadingTerms.value = true;

  const lookupTerms = new Promise<void>((resolve) => {
    Object.values(lookup).forEach(async (val: string) => {
      await terms
        .getById({ id: val })
        .then((result) => {
          relatedTerms.value.push(result);
          if (relatedTerms.value.length === Object.keys(lookup).length) {
            resolve();
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  });

  lookupTerms.then(() => {
    isLoadingTerms.value = false;
    if (related?.value.length === 0 && relatedTerms.value.length > 0) {
      getRelatedObjects(relatedTerms.value[0].id);
    }
  });
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
      const filteredObjects = objects.filter((obj) => obj.id !== details?.id);

      relatedObjects.value = filteredObjects.slice(0, 3); // max 3 related
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function submitSearchTerm(id: string) {
  router.replace({
    name: 'search',
    query: { query: encodeURIComponent(id) }
  });
}

onMounted(async () => {
  if (heritageObject.value) {
    await termLookUp(heritageObject.value.additionalType);
    if (related.value.length > 0) {
      getRelatedObjects(related.value[0].id);
    }
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

.object-metadata {
  margin-bottom: 0;
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
  margin-bottom: 2rem;
}

.object-metadata table tr th,
.object-metadata table tr td {
  border-bottom: 0.5px solid black;
  padding: 0.5rem 0;
  text-align: left;
  vertical-align: top;
}

.object-metadata table tr.no-padding-bottom th,
.object-metadata table tr.no-padding-bottom td {
  padding-bottom: 0;
}

.object-metadata table tr th {
  font-weight: bold;
  width: 25%;
}

.object-metadata table tr td button {
  margin-bottom: 0.5rem;
}

.object-buttons {
  text-align: center;
  margin: 0 auto 3rem auto;
  width: 60vw;
}

.related-objects {
  display: flex;
  gap: 1rem;
}

.related-objects :deep(.search-result-card) {
  max-width: 33%;
}
</style>
