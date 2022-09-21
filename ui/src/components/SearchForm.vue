<template>
  <form class="search-form">
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
import ButtonSelectModal from '@/components/ButtonSelectModal.vue';
import { searchStore } from '@/stores/search.store';

const store = searchStore();

defineProps({
  formSetup: Object
});

function resetSearch() {
  store.resetForm();
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
</style>
