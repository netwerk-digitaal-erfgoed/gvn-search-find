import { ref } from 'vue';
import { defineStore } from 'pinia';

export const searchStore = defineStore('search', () => {
  let modalIsOpen = ref(false);
  
  function showModal() {
    console.log('showModal');
    modalIsOpen.value = true;
  }

  return { showModal }
});
