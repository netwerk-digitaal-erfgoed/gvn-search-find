import { ref } from 'vue';
import { defineStore } from 'pinia';

import * as mockFormData from '@/static/searchFormData.js';

export const searchStore = defineStore('search', () => {
  const modalIsOpen = ref(false);
  const modalIsOfType = ref('');
  const toggleCopyrightValue = ref(0);
  const selectedOptions = ref([]);

  function toggleModal() {
    modalIsOpen.value = modalIsOpen.value === false ? true : false;
  }

  function setModalType(type: string) {
    modalIsOfType.value = type;
  }

  function selectedValues(type: string, selected: Array<string>) {
    const exists = selectedOptions.value.find((el) => el['type'] === type);

    if (exists) {
      const remove = selectedOptions.value.filter((el) => el['type'] !== type);
      remove.push({ type, selected });
      selectedOptions.value = remove;
    } else {
      selectedOptions.value.push({ type, selected });
    }
  }

  function resetForm() {
    selectedOptions.value = [];
    toggleCopyrightValue.value = 0;
  }

  function toggleCopyright(toggle: number) {
    toggleCopyrightValue.value = toggle;
  }

  function fetchMockData() {
    return mockFormData.default;
  }

  return {
    modalIsOpen,
    selectedOptions,
    modalIsOfType,
    toggleCopyrightValue,
    toggleModal,
    selectedValues,
    fetchMockData,
    setModalType,
    toggleCopyright,
    resetForm
  };
});
