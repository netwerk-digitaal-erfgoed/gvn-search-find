<template>
  <form class="search-form">
    <fieldset>
      {{ startSearch }}
      <template
        v-for="(field, key) in formSetup.form"
        :key="key"
      >
        <div v-if="field.type === 'dropdown'">
          <template v-if="key === 'what'">
            <select
              :value="what"
              @change="what = $event.target.value"
            >
              <option 
                value="0"
              >
                {{ field.label }}
              </option>
              <option
                v-for="(option, index) in field.options"
                :key="index"
                :value="option.value"
              >
                {{ option.value }}
              </option>
            </select>
          </template>
          <template v-if="key === 'who'">
            en
            <select
              :value="who"
              @change="who = $event.target.value"
            >
              <option 
                value="0"
              >
                {{ field.label }}
              </option>
              <option
                v-for="(option, index) in field.options"
                :key="index"
                :value="option.value"
              >
                {{ option.value }}
              </option>
            </select>
          </template>
          <template v-if="key === 'where'">
            in 
            <select
              :value="where"
              @change="where = $event.target.value"
            >
              <option 
                value="0"
              >
                {{ field.label }}
              </option>
              <option
                v-for="(option, index) in field.options"
                :key="index"
                :value="option.value"
              >
                {{ option.value }}
              </option>
            </select>
          </template>
        </div>
        <div v-else-if="field.type === 'daterange'">
          <FormDate 
            v-model:fromDate="fromDate"
            v-model:toDate="toDate"
          />
        </div>
      </template>
      .
    </fieldset>
    <input type="submit" value="Zoeken" />
  </form>
</template>

<script setup lang="ts">
  import FormSelect from '@/components/FormSelect.vue';
  import FormDate from '@/components/FormDate.vue';

  import { ref, computed, onMounted } from 'vue';

  const startSearch = ref('Ik ben op zoek naar informatie over');
  const what = ref(0);
  const who = ref(0);
  const where = ref(0);
  const fromDate = ref('');
  const toDate = ref('');

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
  padding: 1rem;
  padding-bottom: 2rem;
  font-size: 3rem;
  margin-bottom: 2rem;
  position: relative;
}

fieldset > div {
  display: inline-block;
}

input[type='submit'] {
  background: var(--color-button);
  font-size: 2rem;
  border: 0;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  position: absolute;
  right: 2rem;
  bottom: -2rem;
}
</style>
