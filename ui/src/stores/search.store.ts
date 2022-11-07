import { ref } from 'vue';
import { defineStore } from 'pinia';

export const searchStore = defineStore('search', () => {
  const selectedObject = ref({});

  function setSelectedObject(object) {
    selectedObject.value = object;
  }

  function getSelectedObject() {
    console.log('getSelectedObject', selectedObject.value);
    return selectedObject.value;
  }

  return {
    getSelectedObject,
    setSelectedObject
  };
});
