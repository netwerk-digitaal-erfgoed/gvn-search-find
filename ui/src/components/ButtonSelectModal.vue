<template>
  <div>
    <button @click="openModal($event, modalType)">{{ selectedOptions ? selectedOptions : modalLabel }}</button>
  </div>
</template>

<script setup lang="ts">
  import { searchStore } from '@/stores/search.store';
  import { computed } from 'vue';
  
  const store = searchStore();
  const props = defineProps({
    modalLabel: String,
    modalType: {
      type: String,
      required: true
    }
  });

  function openModal(event: { preventDefault: () => void; }, type: string) {
    event.preventDefault();
    store.toggleModal();
    store.setModalType(type);
  }

  const selectedOptions = computed(() => {
    const options = store.selectedOptions || [];
    if (options.length === 1) {
      return options[0];
    } else if (options.length === 2) {
      return options[1];
    } else if (options.length > 2) {
      return options.slice(2).join(', ');
    }
    return null;
  });
</script>
