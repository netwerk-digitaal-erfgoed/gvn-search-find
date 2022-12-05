<template>
  <div class="search-result-card" @click="showObjectDetails(object)">
    <div class="search-result-card-image">
      <ProgressiveImage :src="object.image.thumbnail.contentUrl" />
    </div>
    <div class="search-result-card-body">
      {{ object.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ProgressiveImage } from 'vue-progressive-image';
import type { PropType } from 'vue';

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

const router = useRouter();

defineProps({
  object: {
    required: true,
    type: Object as PropType<Result>
  }
});

function showObjectDetails(object: { id: string }) {
  router.push({
    name: 'object',
    query: { object: encodeURIComponent(object.id) }
  });
}
</script>
