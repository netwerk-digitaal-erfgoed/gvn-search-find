<template>
  <div class="search-form-container">
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
    <form class="search-form" @submit.prevent>
      <fieldset v-if="!hasSelectedDataset">
        <label for="query"> Zoek naar datasets over het thema</label>
        <div class="search-field-wrapper">
          <div class="search-field">
            <input
              type="text"
              v-model="datasetSearchTerm"
              placeholder="Bijvoorbeeld 'Familie' of 'Wonen'"
              @keyup.enter="submitDatasetSearch"
            />
          </div>
        </div>
      </fieldset>
      <template v-else>
        <fieldset>
          <label for="query" class="label-term">
            Zoek naar informatie bij het thema '{{ selectedDatasetKeyword }}' in
            de
            <span v-if="selectedDatasets.length > 1">datasets</span>
            <span v-else>dataset</span>
            van
            {{ selectedDatasets.join(', ') }}
            <router-link to="/dataset" class="dataset-selector"
              >AANPASSEN</router-link
            >
          </label>
          <div class="search-field-wrapper">
            <div class="search-field">
              <LoadingSpinnerBar v-if="isLoading" />
              <vue3-simple-typeahead
                id="searching"
                ref="searchInputRef"
                :placeholder="
                  Object.keys(selectedTerm).length === 0
                    ? 'Voer een trefwoord in'
                    : ''
                "
                :item-projection="returnMatchingLabel"
                :items="terms"
                :min-input-length="1"
                :disabled="
                  Object.keys(selectedTerm).length > 0 || isLoading
                    ? true
                    : false
                "
                @selectItem="submitSearchTerm"
                @onInput="getSuggestions"
              />
              <div v-if="selectedTerm.id" class="selected-terms">
                <button @click.prevent="unselectSearchTerm()">
                  <span v-if="selectedTerm.matchingLabel">
                    {{ selectedTerm.matchingLabel }}
                  </span>
                  <span v-if="!selectedTerm.matchingLabel">
                    {{ selectedTerm.prefLabel }}
                  </span>
                  <span
                    v-if="
                      selectedTerm.altLabel && selectedTerm.altLabel.length > 0
                    "
                    class="alt"
                  >
                    &nbsp;({{ selectedTerm.altLabel.join(', ') }})
                  </span>
                  <img src="@/assets/close-button.svg" class="remove" />
                </button>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset
          class="selected-terms"
          v-if="selectedTerm?.broader?.length > 0"
        >
          <template v-for="(term, index) in selectedTerm.broader" :key="index">
            <legend>Of zoek naar alle</legend>
            <button
              v-if="term.prefLabel"
              @click.prevent="selectRelatedTerm(term.id)"
            >
              {{ term.prefLabel }}
            </button>
          </template>
        </fieldset>
        <fieldset
          class="selected-terms"
          v-if="selectedTerm?.narrower?.length > 0"
        >
          <legend>Of verfijn het zoekresultaat</legend>
          <template v-for="(term, index) in selectedTerm.narrower" :key="index">
            <button
              v-if="term.prefLabel"
              @click.prevent="selectRelatedTerm(term.id)"
            >
              {{ term.prefLabel }}
            </button>
          </template>
        </fieldset>
      </template>
    </form>
  </div>
</template>

<script setup lang="ts">
import LoadingSpinnerBar from '@/components/LoadingSpinnerBar.vue';

import { ref, onMounted, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { searchStore } from '@/stores/search.store';

import { Terms } from '@/sdk/terms';

const router = useRouter();
const route = useRoute();
const store = searchStore();

const terms: Ref<Array> = ref([]);
const selectedTerm: Ref<Array> = ref([]); // Currently, it's only possible to select one term at a time.
const searchInputRef = ref([]);
const datasetSearchTerm = ref('');
const currentInput = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const hasSelectedDataset = ref(false);
const selectedDatasets = ref([]);
const selectedDatasetKeyword = ref('');

const termsFromSDK = new Terms();

defineProps({
  formSetup: Object,
  variant: String
});

const emit = defineEmits(['showResults']);

function returnMatchingLabel(item: { id: string; matchingLabel: string }) {
  return item.matchingLabel;
}

function submitDatasetSearch() {
  store.setSelectedDatasetKeyword(datasetSearchTerm.value);
  router.push({
    name: 'dataset'
  });
}

function submitSearchTerm(item?: { id: string; matchingLabel: string }) {
  errorMessage.value = '';
  if (item) {
    router.replace({
      name: 'search',
      query: { query: encodeURIComponent(item.id), label: item.matchingLabel }
    });
  } else {
    router.push({
      name: 'search'
    });
  }
}

async function selectSearchTerm(id: string) {
  selectedTerm.value = [];
  isLoading.value = true;
  await getTermDetails(id);

  // show results
  emit('showResults', selectedTerm.value); // improve search results retrieval
}

function unselectSearchTerm() {
  submitSearchTerm();
}

async function getTermDetails(term: string) {
  selectedTerm.value = [];
  await termsFromSDK
    .getById({ id: term })
    .then((result) => {
      selectedTerm.value = result;
      isLoading.value = false;
    })
    .catch((error) => {
      errorMessage.value = error; // user-friendly error message
      isLoading.value = false;
      selectedTerm.value = {
        id: route.query.query,
        prefLabel: route.query.label
      }; // fallback: still set the selected button, without suggestions
    });
}

function selectRelatedTerm(id: string) {
  submitSearchTerm({ id: id, matchingLabel: '' }); // overwrite selected term
}

async function getSuggestions(item: { input: string }) {
  currentInput.value = item.input;

  await termsFromSDK
    .autocomplete({ word: currentInput.value })
    .then((result) => {
      terms.value = result;
    })
    .catch((error) => {
      errorMessage.value = error;
      isLoading.value = false;
    });
}

onMounted(() => {
  // todo: move these checks to the parent component?
  // dataset selected?
  if (store.getSelectedDataset().length > 0) {
    hasSelectedDataset.value = true;
    selectedDatasets.value = store.getSelectedDataset();
    selectedDatasetKeyword.value = store.getSelectedDatasetKeyword();

    // term selected?
    if (route.query.query && route.query.query !== 'undefined') {
      selectSearchTerm(decodeURIComponent(route.query.query as string)); // move to parent component?
    }
  } else {
    router.replace({
      name: 'search'
    });
  }
});
</script>

<style scoped>
.error-message {
  background-color: var(--vt-c-dark-yellow);
}

input[type='submit'] {
  background: var(--vt-c-orange);
  font-size: 1rem;
  font-weight: bold;
  border: 0;
  border-radius: 0.25rem;
  padding: 1rem;
  margin: 0;
}

input[type='text'] {
  width: 100%;
  margin-right: 0;
  border: 0;
}

.label-term {
  display: inline-block;
  max-width: 70%;
}

.search-field-wrapper {
  background: #fff;
  border: 1px solid #000;
  padding: 0.25rem;
  border-radius: 0.25rem;
  width: 100%;
  margin-top: 1rem;
  line-height: 2.25;
}

.remove {
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  margin-left: 0.25rem;
  margin-top: 0.25rem;
}

.selected-terms {
  font-size: 1rem;
  line-height: 1;
}

.search-field-wrapper .selected-terms {
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  max-width: calc(100% - 1rem);
}

.search-field-wrapper .selected-terms button {
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  line-height: 1.25;
  border: 1px solid var(--vt-c-orange);
  display: inline-flex;
  align-items: center;
  max-width: 100%;
}

.selected-terms button {
  font-size: 1rem;
  line-height: 1rem;
  background-color: #fff;
  display: inline-flex;
  margin-bottom: 0.5rem;
}

.selected-terms button span.alt {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.search-field {
  display: flex;
  align-items: center;
}

div#searching_wrapper.simple-typeahead :deep(input) {
  border: 0;
  width: 100%;
  margin-bottom: 0;
}
div#searching_wrapper.simple-typeahead :deep(input:disabled) {
  background: #fff;
}

a.dataset-selector {
  font-size: 0.875rem;
  margin-left: 0.75rem;
  text-transform: uppercase;
}

.related button {
  font-size: 0.85rem;
}

.search-select {
  display: flex;
  flex-wrap: nowrap;
}

select {
  margin-bottom: 0.5rem;
  width: 100%;
}
</style>
