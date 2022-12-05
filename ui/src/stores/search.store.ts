import { ref } from 'vue';
import { defineStore } from 'pinia';

export interface Term {
  broader: Array<string>;
  id: string;
  prefLabel: string;
}

export const searchStore = defineStore('search', () => {
  const selectedObject = ref({});

  function setSelectedTerm(object: Term) {
    selectedObject.value = object;
  }

  function getSelectedTerm() {
    return selectedObject.value;
  }

  return {
    setSelectedTerm,
    getSelectedTerm
  };
});
