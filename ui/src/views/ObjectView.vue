<template>
  <div>
    <div class="text-container centered">
      <LoadingSpinnerBar v-if="isLoading" />
    </div>
    <ObjectDetails
      v-if="objectDetails"
      :details="objectDetails"
      :related="objectRelatedTerm"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

import ObjectDetails from '@/components/ObjectDetails.vue';
import LoadingSpinnerBar from '@/components/LoadingSpinnerBar.vue';
import { searchStore } from '@/stores/search.store';

import { HeritageObjects } from '../../sdk/build/heritage-objects';

export interface Term {
  broader: Array<string>;
  id: string;
  prefLabel: string;
}

const route = useRoute();
const router = useRouter();

const isLoading = ref(false);
const store = searchStore();

const heritageObjects = new HeritageObjects();
const objectDetails = ref();
const objectRelatedTerm = ref(); //  use this term to find related objects, either broader or same term

async function getObjectDetails(id: string) {
  const objectId = decodeURIComponent(id);
  isLoading.value = true;

  await heritageObjects
    .getById({ id: objectId })
    .then((result) => {
      objectDetails.value = result;
      isLoading.value = false;
    })
    .catch((error) => {
      console.error('Error:', error); // todo: show error on page
    });
}

onMounted(() => {
  if (route.query.object) {
    getObjectDetails(route.query.object as string);

    const term = store.getSelectedTerm() as Term;
    if (Object.keys(term).length === 0) {
      objectRelatedTerm.value = [];
    } else {
      if (Object.keys(term.broader).length > 0) {
        objectRelatedTerm.value = term.broader;
      } else {
        const current = [{ id: term.id, prefLabel: term.prefLabel }];
        objectRelatedTerm.value = current;
      }
    }
  } else {
    router.push({
      name: 'home' // return to search form
    });
  }
});
</script>
