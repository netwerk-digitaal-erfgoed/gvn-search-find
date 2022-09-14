<template>
  <form class="search-form">
    <fieldset>
      {{ startSearch }}
      <template
        v-for="(field, key) in formSetup?.form"
        :key="key"
      >
        <ButtonSelectModal
          :modal-label="field.label"
          :modal-type="key"
        />
      </template>.
    </fieldset>
    <div class="buttons">
      <input type="submit" value="Zoeken" />
    </div>    
  </form>
</template>

<script setup lang="ts">
  import FormSelect from '@/components/FormSelect.vue';
  import ButtonSelectModal from '@/components/ButtonSelectModal.vue';

  import { ref, computed, onMounted } from 'vue';

  const startSearch = ref('Ik ben op zoek naar informatie over');

  const props = defineProps({
    formSetup: Object
  });
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
  font-size: 3rem;
  margin-bottom: 2rem;
  position: relative;
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
  border: 0;
  border-radius: 0.25rem;
  padding: 1rem;
  margin: 0;
}
</style>
