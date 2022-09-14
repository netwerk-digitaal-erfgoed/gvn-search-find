<template>
  <div v-if="isVisible" class="modal-wrapper">
    <div class="modal-overlay" @click="closeModal()"></div>
    <div class="modal-body">
      <button
        :class="{ selected: selected.slice(-1)[0] === options?.label }"
        @click="selectOption($event, options, 0)"
      >
        {{ options?.label }}
      </button>
      <template v-for="(sub, index) in options?.sub" :key="index">
        <template
          v-if="
            !selected[1] ||
            (selected[1] === sub.label && selected[0] === options?.label)
          "
        >
          <button
            class="subs"
            :class="[{ selected: selected.slice(-1)[0] === sub.label }]"
            @click="selectOption($event, sub, 1)"
          >
            {{ sub.label }}
          </button>
          <template v-if="selected.includes(sub.label)">
            <button
              v-for="subsub in sub.sub"
              :key="subsub"
              :class="[{ selected: selected.includes(subsub) }]"
              @click="selectOption($event, subsub, 2)"
            >
              {{ subsub }}
            </button>
          </template>
        </template>
      </template>
      <div class="buttons">
        <button class="submit" @click="closeModal">Ok!</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue';
import { searchStore } from '@/stores/search.store';

defineProps({
  isVisible: Boolean
});
const options = ref();
const selected = ref<Array<string>>([]);
const store = searchStore();

function selectOption(
  event: { preventDefault: () => void },
  option: string | Array,
  index: number
) {
  event.preventDefault();

  if (option.label && option.sub) {
    selected.value = selected.value.slice(0, index + 1);
    selected.value[index] = option.label;
  } else {
    if (selected.value.includes(option)) {
      selected.value = selected.value.filter((e) => e !== option); // remove
    } else {
      selected.value.push(option); // add
    }
  }
  submitSelected();
}

function closeModal() {
  store.toggleModal();
  selected.value = []; // clear selected
}

function submitSelected() {
  store.selectedValues(store.modalIsOfType, selected.value);
}

onUpdated(() => {
  const data = store.fetchMockData().form;
  const optionsForThisType = data[store.modalIsOfType].options;
  const selectedForThisType = store.selectedOptions.find(
    (el) => el['type'] === store.modalIsOfType
  );

  options.value = optionsForThisType;
  if (selectedForThisType && store.modalIsOpen) {
    selected.value = selectedForThisType.selected;
  } else {
    selected.value[0] = optionsForThisType.label;
  }
});
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
}

.modal-overlay {
  background-color: rgba(0, 0, 0, 0.6);
  height: 100vw;
  width: 100vw;
  position: fixed;
  z-index: 0;
}
.modal-body {
  background: #fff;
  position: absolute;
  top: calc(50vh - 150px);
  left: 25vw;
  width: 50vw;
  height: 300px;
  z-index: 1;
  padding: 2rem;
}

.buttons {
  margin-top: 4rem;
}

button {
  margin-right: 1rem;
  margin-bottom: 1rem;
}

button.submit {
  background: #fff;
  border: 1px solid var(--color-button);
}

button.hide {
  display: none;
}
button.selected {
  background: #000;
  color: #fff;
}
</style>
