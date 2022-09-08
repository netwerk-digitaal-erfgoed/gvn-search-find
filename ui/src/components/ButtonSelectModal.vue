<template>
  <button @click="openModal($event)">{{ modalType }}</button>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { searchStore } from '@/store/search.store';


  const store = searchStore();
  const props = defineProps({
    modalType: String
  });

  function openModal(event: { preventDefault: () => void; }) {
    event.preventDefault();
    console.log(typeof store.showModal);
    store.showModal();
  }
</script>

<style scoped>
  button {
    background: var(--color-button);
    font-size: 2rem;
    border: 0;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    margin-right: 1rem;
    cursor: pointer;
    box-shadow: 5px 10px #888888;
  }

  button:hover {
    transition: box-shadow 0.2s;
    box-shadow: 5px 5px #888888;
  }

  button:focus {
    transform: scale(0.98);
    box-shadow: 5px 5px #888888;
  }
</style>