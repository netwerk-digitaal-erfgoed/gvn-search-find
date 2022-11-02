<template>
  <div class="search-form-container">
    <form v-if="variant === 'browser'" class="search-form">
      <fieldset>
        Ik ben op zoek naar
        <ToggleButton
          :toggle-options="['Alle', 'Rechtenvrije']"
          :pressed="store.toggleCopyrightValue"
        />
        informatie over
        <template v-for="(field, key) in formSetup?.form" :key="key">
          {{ field.sentence }}
          <ButtonSelectModal
            :modal-label="field.label"
            :modal-type="key"
          /> </template
        >.
      </fieldset>
      <fieldset>
        <button @click.prevent="resetSearch">Begin opnieuw</button>
      </fieldset>
    </form>
    <form v-else class="search-form">
      <fieldset>
        <label for="query">Zoek naar informatie over</label>
        <div class="search-field-wrapper">
          <div class="search-field">
            <vue3-simple-typeahead
              id="searching"
              ref="searchInputRef"
              placeholder="Voer zoekwoorden in"
              :item-projection="formatTerms"
              :items="terms"
              :min-input-length="1"
              @selectItem="selectSearchTerm"
              @keyup.enter="freeSearchTerm"
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
            <span>{{ term.term }}</span> <span class="remove">x</span>
          </button>
        </div>
      </fieldset>
      <template v-if="relatedTerms.length > 0">
        <fieldset class="selected-terms">
          <legend>Ook interessant</legend>
          <template v-for="(term, index) in relatedTerms" :key="index">
            <button @click.prevent="selectRelatedTerm(term)">
              {{ term }}
            </button>
          </template>
        </fieldset>
      </template>
      <fieldset class="search-select">
        <legend>Filter op</legend>
        <FormSelect
          v-for="(select, index) in mockSelectFormData.default.form"
          :key="index"
          :select="select"
        />
      </fieldset>
      <!--<fieldset>
        <button @click.prevent="resetSearch">Begin opnieuw</button>
      </fieldset>-->
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import ToggleButton from '@/components/ToggleButton.vue';
import FormSelect from '@/components/FormSelect.vue';
import ButtonSelectModal from '@/components/ButtonSelectModal.vue';
import { searchStore } from '@/stores/search.store';

import * as mockSelectFormData from '@/static/searchFormSelectData.js';

const store = searchStore();
const terms = ref([]);
const selectedTerms = ref([]);
const searchInputRef = ref([]);
const relatedTerms = ref([]);

const mockedTerms = [
  {
    term: 'laarsen',
    synonyms: ['laars', 'laarzen'],
    broader: ['schoeisel']
  },
  {
    term: 'pantoffels',
    synonyms: ['pantoffel', 'slipper', 'slippers'],
    broader: ['schoeisel']
  },
  {
    term: 'schoenen',
    synonyms: ['schoen'],
    broader: ['schoeisel'],
    narrower: ['pontificaalschoenen', 'schoenhakken', 'zeilschoenen'],
    related: ['schoenwinkels']
  },
  {
    term: 'sandalen',
    synonyms: ['sandaal'],
    broader: ['schoeisel']
  },
  {
    term: 'klompen',
    synonyms: ['klomp'],
    broader: ['schoeisel'],
    narrower: ['Apeldoornse klompen', 'brugwachtersklompen', 'dopjes']
  }
];

defineProps({
  formSetup: Object,
  variant: String
});

function resetSearch() {
  store.resetForm();
}

function formatTerms(item) {
  console.log('formatTerms', item);
  const s = item.synonyms ? `(${item.synonyms.join(', ')})` : '';
  return `${item.term} ${s}`;
}

function sortTerms(
  listOfTerms: (
    | {
        term: string;
        synonyms: string[];
        broader: string[];
        narrower?: undefined;
        related?: undefined;
      }
    | {
        term: string;
        synonyms: string[];
        broader: string[];
        narrower: string[];
        related: string[];
      }
    | {
        term: string;
        synonyms: string[];
        broader: string[];
        narrower: string[];
        related?: undefined;
      }
  )[]
) {
  terms.value = listOfTerms.sort((a, b) => a.term.localeCompare(b.term));
}

function addTerm(item) {
  terms.value.push(item);
  sortTerms(terms.value);
}

function removeTermFromList(item: { term }) {
  terms.value = terms.value.filter((el) => el.term !== item.term);
}

function selectSearchTerm(item) {
  console.log('selectSearchTerm', item);
  if (!selectedTerms.value.includes(item)) {
    searchInputRef.value.clearInput();
    selectedTerms.value.push(item);
    removeTermFromList(item);
    findRelatedTerms();
  }
}

function unselectSearchTerm(item) {
  console.log('unselectSearchTerm', item, selectedTerms.value);
  selectedTerms.value = selectedTerms.value.filter(
    (el) => el.term !== item.term
  );
  addTerm(item);
}

function freeSearchTerm() {
  console.log('freeSearchTerm', searchInputRef.value.input);
  selectedTerms.value.push({ term: searchInputRef.value.input });
  searchInputRef.value.clearInput();
}

function findRelatedTerms() {
  console.log('findRelatedTerms', typeof selectedTerms.value);
  const related = [];

  selectedTerms.value.forEach((el) => {
    // broader, narrow, and related
    // todo: rewrite
    el.broader?.forEach((b) => {
      related.push(b);
    });

    el.narrower?.forEach((n) => {
      related.push(n);
    });

    el.related?.forEach((r) => {
      related.push(r);
    });
  });

  let uniqueRelated = [...new Set(related)];
  uniqueRelated = uniqueRelated.filter((el) => {
    const isSelected = selectedTerms.value.some((s) => s.term === el);
    console.log('isSelected', isSelected);
    return !isSelected ? el : false;
  });
  // console.log(uniqueRelated);
  relatedTerms.value = uniqueRelated;
}

function selectRelatedTerm(term) {
  console.log('selectRelatedTerm', term);
  const t = { term: term };

  if (!selectedTerms.value.includes(t)) {
    selectedTerms.value.push(t);
    // remove from related
    relatedTerms.value = relatedTerms.value.filter((el) => el !== term);
  }
}

onMounted(() => {
  console.log('mounted');
  sortTerms(mockedTerms);
});
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
