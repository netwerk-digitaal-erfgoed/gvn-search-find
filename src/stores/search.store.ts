import { ref } from 'vue';
import { defineStore } from 'pinia';

export interface Term {
  broader: Array<string>;
  id: string;
  prefLabel: string;
}

export const searchStore = defineStore('search', () => {
  const selectedObject = ref({});
  const selectedDataset = ref(false);

  function setSelectedTerm(object: Term) {
    selectedObject.value = object;
  }

  function getSelectedTerm() {
    return selectedObject.value;
  }

  function setSelectedDataset() {
    selectedDataset.value = true; // temp hacky solution
  }

  function getSelectedDataset() {
    return selectedDataset.value;
  }

  return {
    setSelectedTerm,
    getSelectedTerm,
    setSelectedDataset,
    getSelectedDataset
  };
});
