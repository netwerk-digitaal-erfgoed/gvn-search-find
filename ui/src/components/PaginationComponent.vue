<template>
  <div class="pagination-container" aria-label="row pagination">
    <ul v-if="numberOfPages >= 1" class="pagination">
      <li
        class="page-item"
        aria-label="go to previous page"
        @click="previous()"
        :class="{
          disabled: currentPage === 1
        }"
      >
        <span class="page-link">&laquo;</span>
      </li>
      <li v-if="numberOfPages > showPages && currentPage > 1" class="page-item">
        <span>...</span>
      </li>
      <template v-for="index in numberOfPages" :key="index">
        <li
          v-if="showPageInPagination(index)"
          :aria-label="'go to page ' + index"
          class="page-item"
          @click="setCurrentPage(index)"
        >
          <div
            class="page-link"
            :class="{
              'active-page': currentPage === index
            }"
          >
            {{ index }}
          </div>
        </li>
      </template>
      <li
        v-if="numberOfPages > showPages && currentPage !== numberOfPages"
        class="page-item"
      >
        <span>...</span>
      </li>
      <li
        class="page-item"
        :class="{
          disabled: currentPage === numberOfPages || !numberOfPages
        }"
        aria-label="go to next page"
        @click="next()"
      >
        <div class="page-link">&raquo;</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';

const props = defineProps({
  numberOfPages: {
    required: true
  },
  modelValue: {
    required: true,
    type: Number
  }
});

const showPages = ref(10);
const { numberOfPages, modelValue: currentPage } = toRefs(props);
const emit = defineEmits(['update:modelValue']);

function showPageInPagination(index: number) {
  if (numberOfPages.value <= showPages.value) {
    return true;
  }
  return (
    index >= currentPage.value && index < currentPage.value + showPages.value
  );
}

function setCurrentPage(number: number) {
  emit('update:modelValue', number);
}

function previous() {
  if (currentPage.value === 1) return;
  emit('update:modelValue', currentPage.value - 1);
}

function next() {
  if (currentPage.value >= numberOfPages.value) return;
  emit('update:modelValue', currentPage.value + 1);
}
</script>

<style scoped>
.pagination-container {
  display: inline-block;
}

.pagination {
  margin: 0;
  padding: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  border: none;
  box-sizing: border-box;
  overflow: hidden;
  word-wrap: break-word;
  align-content: center;
}

.page-item {
  display: flex;
  cursor: pointer;
  margin-bottom: 0;
  user-select: none;
}

.page-link {
  color: var(--color-link);
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
}

.page-link:hover {
  text-decoration: underline;
}

.active-page {
  background-color: var(--vt-c-dark-blue);
  color: #fff;
}

.disabled {
  visibility: hidden;
}
</style>
