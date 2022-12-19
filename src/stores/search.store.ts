import { ref } from 'vue';
import { defineStore } from 'pinia';

export interface Term {
  broader: Array<string>;
  id: string;
  prefLabel: string;
}

const selectedObject = ref({});
const selectedDatasetKeyword = ref('');
const selectedDataset = ref([]);

export const searchStore = defineStore('search', () => {
  function setSelectedTerm(object: Term) {
    selectedObject.value = object;
  }

  function getSelectedTerm() {
    return selectedObject.value;
  }

  function setSelectedDatasetKeyword(keyword: string) {
    selectedDatasetKeyword.value = keyword;
  }

  function getSelectedDatasetKeyword() {
    return selectedDatasetKeyword.value;
  }

  function setSelectedDataset(datasets: Array<string>) {
    selectedDataset.value = datasets;
  }

  function getSelectedDataset() {
    return selectedDataset.value;
  }

  return {
    setSelectedTerm,
    getSelectedTerm,
    setSelectedDatasetKeyword,
    getSelectedDatasetKeyword,
    setSelectedDataset,
    getSelectedDataset
  };
});
