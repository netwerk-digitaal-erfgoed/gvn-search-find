import { ref } from 'vue';
import { defineStore } from 'pinia';

import * as mockFormData from '@/static/searchFormData.js';

export const searchStore = defineStore('search', () => {
  let modalIsOpen = ref(false);
  let modalIsOfType = ref('');
  let selectedOptions = ref();
  
  function toggleModal() {
    modalIsOpen.value = modalIsOpen.value === false ? true : false;
  }

  function setModalType(type: string) {
    modalIsOfType.value = type;
  }

  function selectedValues(type: string, selected: Array<string>) {
    selectedOptions.value = selected;
  }

  function fetchMockData() {    
    return mockFormData.default;
  }

  return { modalIsOpen, selectedOptions, modalIsOfType, toggleModal, selectedValues, fetchMockData, setModalType }
});
