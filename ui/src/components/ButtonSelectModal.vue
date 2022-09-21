<template>
  <div>
    <button @click.prevent="openModal(modalType)">
      {{ selectedOptions ? selectedOptions : modalLabel }}
    </button>
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

function openModal(type: string) {
  store.toggleModal();
  store.setModalType(type);
}

const selectedOptions = computed(() => {
  const options = store.selectedOptions || [];
  const selected = options.find((el) => el['type'] === props.modalType);

  if (selected) {
    if (selected.selected.length === 1) {
      return selected.selected[0];
    } else if (selected.selected.length === 2) {
      return selected.selected[1];
    } else if (selected.selected.length > 2) {
      return selected.selected.slice(2).join(', ');
    }
  }
  return null;
});
</script>
