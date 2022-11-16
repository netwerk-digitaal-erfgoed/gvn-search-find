<template>
  <div>
    <ObjectDetails v-if="objectDetails" :details="objectDetails" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

import ObjectDetails from '@/components/ObjectDetails.vue';

import { HeritageObjects } from '../../../sdk/build/heritage-objects';

const route = useRoute();
const router = useRouter();

const heritageObjects = new HeritageObjects();
const objectDetails = ref();

async function getObjectDetails(id: string) {
  const objectId = decodeURIComponent(id);
  await heritageObjects
    .getById({ id: objectId })
    .then((result) => {
      objectDetails.value = result;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

onMounted(() => {
  if (route.query.object) {
    getObjectDetails(route.query.object as string);
  } else {
    router.push({
      name: 'home' // return to search form
    });
  }
});
</script>

<style scoped></style>
