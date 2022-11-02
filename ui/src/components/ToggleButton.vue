<template>
  <div class="toggle-wrapper">
    <button
      v-for="(button, key) in toggleOptions"
      :key="key"
      :class="{ pressed: pressed === key }"
      @click.prevent="toggleButton(key)"
    >
      {{ button }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { searchStore } from '@/stores/search.store';

const store = searchStore();

defineProps({
  toggleOptions: Array,
  pressed: Number
});

function toggleButton(key) {
  store.toggleCopyright(key); // todo: make more generic
}
</script>

<style>
.toggle-wrapper {
  margin-bottom: 0.5rem;
}

.toggle-wrapper button:first-child {
  margin-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.toggle-wrapper button:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.toggle-wrapper button:not(.pressed) {
  background: #fff;
  color: rgba(35, 36, 81, 0.5);
}
</style>
