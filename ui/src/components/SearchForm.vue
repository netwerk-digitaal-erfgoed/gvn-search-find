<template>
  <form class="search-form" v-if="variant==='traditional'">
    <ToggleButton
      :toggle-options="['Alles', 'Rechtenvrij']"
      :pressed="store.toggleCopyrightValue"
    />
    <select>
      <option>Selecteer een instelling</option>
      <option>Het Utrechts Archief</option>
      <option>Koninklijke Bibliotheek</option>
      <option>Stadsarchief Amsterdam</option>
      <option>Zuiderzee Museum</option>
    </select>
    <select>
      <option>Selecteer een periode</option>
      <option>1800</option>
      <option>18e eeuw</option>
      <option>jaren 40</option>
      <option>18 november 1999</option>
      <option>zonder datum</option>
    </select>
    <select>
      <option>Selecteer een locatie</option>
      <option>Nederland</option>
      <option>Noord-Holland</option>
      <option>Amsterdam</option>
      <option>Deventer</option>
      <option>Delft</option>
    </select>
    <select>
      <option>Selecteer een thema</option>
      <option>Kunst</option>
      <option>Sport</option>
      <option>Mode</option>
      <option>Flora en fauna</option>
      <option>Architectuur</option>
    </select>
  </form>
  <form class="search-form" v-else-if="variant==='mixture'">
    <label for="query">Ik ben op zoek naar informatie over</label>      
    <fieldset class="search-field">
      <input type="text" name="query" id="query" v-model="query" />
      <input type="submit" value="Zoeken" @click.prevent="handleSubmit"/>
    </fieldset>
    <fieldset class="related">Gerelateerd: 
      <button>Sneaker</button>
      <button>Slipper</button>
      <button>Mode</button>
    </fieldset>
    <fieldset class="search-select">
      <FormSelect v-for="(select, index) in mockSelectFormData.default.form" :key="index" :select="select" />
    </fieldset>
    <fieldset>
      <button @click.prevent="resetSearch">Begin opnieuw</button>
    </fieldset>
  </form>
  <form class="search-form" v-else>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';

import ToggleButton from '@/components/ToggleButton.vue';
import FormSelect from '@/components/FormSelect.vue';
import ButtonSelectModal from '@/components/ButtonSelectModal.vue';
import { searchStore } from '@/stores/search.store';

import * as mockSelectFormData from '@/static/searchFormSelectData.js';

const store = searchStore();
const query = ref('');

defineProps({
  formSetup: Object,
  variant: String
});

function resetSearch() {
  store.resetForm();
}

function handleSubmit() {
  console.log(mockSelectFormData);
  console.log('handleSubmit', query.value);
}

</script>

<style scoped>
.search-form {
  margin-bottom: 3rem;
  font-size: 1.5rem;
}

fieldset {
  border: 0;
  background: #fff;
  padding: 0;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  position: relative;
  line-height: 2.25;
}

fieldset > div {
  display: inline-block;
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

.search-field {
  border: 1px solid #000;
  padding: 0.25rem;
  display: flex;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}
.search-field input {
  border: 0;
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
