<template>
  <div class="search-form-container">
    <form class="search-form">
      <fieldset>
        <label for="query">Zoek naar informatie over</label>
        <div class="search-field-wrapper">
          <div class="search-field">
            <vue3-simple-typeahead
              id="searching"
              ref="searchInputRef"
              placeholder="Voer een trefwoord in"
              :item-projection="returnPrefLabel"
              :items="terms"
              :min-input-length="1"
              @selectItem="selectSearchTerm"
              @onInput="getSuggestions"
            />
            <!--<input type="submit" value="Zoeken" @click.prevent="handleSubmit"/>-->
          </div>
        </div>
        <div v-if="selectedTerms.length > 0" class="selected-terms">
          <button
            v-for="(term, index) in selectedTerms"
            :key="index"
            @click.prevent="unselectSearchTerm(term)"
          >
            <span>{{ term.prefLabel }}</span> <span class="remove">x</span>
          </button>
        </div>
      </fieldset>
      <template v-if="relatedTerms">
        <fieldset class="selected-terms" v-if="relatedTerms.broader">
          <template v-for="(term, index) in relatedTerms.broader" :key="index">
            <legend>Zoek naar alle</legend>
            <button
              v-if="term.prefLabel"
              @click.prevent="selectRelatedTerm(term)"
            >
              {{ term.prefLabel }}
            </button>
          </template>
        </fieldset>
        <fieldset class="selected-terms" v-if="relatedTerms.narrower">
          <legend>Of verfijn het zoekresultaat</legend>
          <template v-for="(term, index) in relatedTerms.narrower" :key="index">
            <button
              v-if="term.prefLabel"
              @click.prevent="selectRelatedTerm(term)"
            >
              {{ term.prefLabel }}
            </button>
          </template>
        </fieldset>
      </template>
      <!-- 
        FILTERS
        <fieldset class="search-select">
        <legend>Filter op</legend>
        <FormSelect
          v-for="(select, index) in mockSelectFormData.default.form"
          :key="index"
          :select="select"
        />
      </fieldset>-->
      <!--<fieldset>
        <button @click.prevent="resetSearch">Begin opnieuw</button>
      </fieldset>-->
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import FormSelect from '@/components/FormSelect.vue';
// import { Terms } from '../../../sdk/src/terms';

import { Terms } from '../../../sdk/build/terms';

const terms = ref([]);
const selectedTerms = ref([]);
const searchInputRef = ref([]);
const relatedTerms = ref({});
const currentInput = ref('');

const termsFromSDK = new Terms();

defineProps({
  formSetup: Object,
  variant: String
});

const emit = defineEmits(['showResults']);

function returnPrefLabel(item: { id: string; prefLabel: string }) {
  return item.prefLabel;
}

function removeTermFromList(item: { id: string }) {
  terms.value = terms.value.filter(
    (el: { term: string; prefLabel: string }) => {
      return el.term !== item.id;
    }
  );
}

function selectSearchTerm(item: { id: string; prefLabel: string }) {
  selectedTerms.value = [];

  if (!selectedTerms.value.includes(item)) {
    clearSuggestions();
    searchInputRef.value.clearInput();

    selectedTerms.value.push(item);

    removeTermFromList(item);
    findRelatedTerms();

    emit('showResults', selectedTerms.value);
  }
}

function unselectSearchTerm(item: { id: string; prefLabel: string }) {
  selectedTerms.value = selectedTerms.value.filter(
    (el: { id: string; prefLabel: string }) => el.id !== item.id
  );
  // update related terms?
  findRelatedTerms();

  // update search results
  emit('showResults', selectedTerms.value);
}

function clearSuggestions() {
  terms.value = [];
}

function findRelatedTerms() {
  relatedTerms.value = [];
  selectedTerms.value.forEach(async (term) => {
    await termsFromSDK
      .getById({ id: term.id })
      .then((result) => {
        //.log('findRelatedTerms', result);
        relatedTerms.value = result;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}

function selectRelatedTerm(term: { id: string; prefLabel: string }) {
  console.log('selectRelatedTerm', term);

  // overwrite selectedTerms
  selectedTerms.value = [];
  selectedTerms.value.push(term);

  // update related terms?
  findRelatedTerms();

  // update search results
  emit('showResults', selectedTerms.value);
}

async function getSuggestions(item: { input: string }) {
  //console.log('getSuggestions');
  currentInput.value = item.input;

  await termsFromSDK
    .autocomplete({ word: currentInput.value })
    .then((result) => {
      terms.value = result;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
</script>

<style scoped>
.search-form-container {
  background: var(--vt-c-brown-soft);
}
.search-form {
  margin: 0 auto 3rem auto;
  font-size: 1.5rem;
  padding: 1.5rem 0;
  width: 75vw;
}

fieldset {
  border: 0;
  padding: 0;
  position: relative;
  line-height: 2.25;
  margin-bottom: 1rem;
}

fieldset > div {
  display: inline-block;
}

fieldset legend {
  font-size: 1.5rem;
  line-height: 2.25;
}
.buttons {
  text-align: right;
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

.search-field-wrapper {
  background: #fff;
  border: 1px solid #000;
  padding: 0.25rem;
  border-radius: 0.25rem;
  width: 100%;
}

.selected-terms {
  font-size: 1rem;
  line-height: 1;
}

.selected-terms button {
  font-size: 1rem;
  line-height: 1rem;
  background-color: #fff;
  display: inline-flex;
  margin-bottom: 0.5rem;
}

.selected-terms button span.remove {
  border-radius: 50%;
  background-color: var(--vt-c-orange);
  width: 16px;
  height: 16px;
  display: inline-block;
  line-height: 15px;
  text-align: center;
  margin-left: 0.5rem;
}

.search-field {
  display: flex;
}

div#searching_wrapper.simple-typeahead :deep(input) {
  border: 0;
  width: 100%;
  margin-bottom: 0;
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
