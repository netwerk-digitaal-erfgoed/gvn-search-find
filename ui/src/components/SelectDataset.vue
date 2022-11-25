<template>
  <div class="search-form-container">
    <form class="search-form">
      <fieldset>
        <label for="query">Kies één of meer datasets</label>
        <div class="select-dataset-wrapper">
          <label>
            <input type="checkbox" name="dataset" value="" />
            Museum Rotterdam
          </label>
          <label>
            <input type="checkbox" name="dataset" value="" />
            Nationaal Archief
          </label>
        </div>
      </fieldset>
      <div class="buttons">
        <button
          class="orange"
          @click.prevent="selectDatasets()"
        >
          Selecteer
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function selectDatasets() {
    router.replace({
      name: 'home'
    }); // temp 
  }

</script>

<style scoped>
  .select-dataset-wrapper {
    width: 100%;
  }

  .select-dataset-wrapper label {
    display: block;
  }
</style>