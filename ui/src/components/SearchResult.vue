<template>
  <div class="search-result-card" @click="showObjectDetails(object)">
    <div class="search-result-card-image">
      <img
        v-if="object.image.thumbnail.contentUrl"
        :src="object.image.thumbnail.contentUrl"
        alt=""
      />
    </div>
    <div class="search-result-card-body">
      {{ object.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
defineProps({
  object: Object
});

function showObjectDetails(object: { id: string }) {
  router.push({
    name: 'object',
    query: { object: encodeURIComponent(object.id) }
  });
}
</script>
