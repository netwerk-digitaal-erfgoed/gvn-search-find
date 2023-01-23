<template>
  <div>
    <div
      v-if="
        Object.keys(datasetSummaries).length > 0 && !isLoading && !datasetReady
      "
      class="search-form-container"
    >
      <form class="search-form">
        <fieldset>
          <label for="query"
            >Zoek datasets bij het thema '{{ selectedKeyword }}'</label
          >
          <br/>
          <p><em>Let op: in dit prototype is op dit moment alleen de dataset van het Museum Rotterdam beschikbaar!</em></p>
          <p>
            Er zijn {{ Object.keys(datasetSummaries).length }} datasets gevonden
            die voldoen aan je zoekvraag.
          </p>
          <div class="select-dataset-wrapper">
            <template v-for="(dataset, index) in datasetSummaries" :key="index">
              <div class="select-summary">
                <label>
                  <input
                    type="checkbox"
                    name="dataset"
                    v-model="datasets"
                    :value="dataset.name"
                  />
                  {{ dataset.name }}
                </label>
                <template v-if="dataset.description">
                  <button class="small summary" @click.prevent="toggleSummary">
                    Toon/verberg samenvatting
                    <span class="arrow" />
                  </button>
                  <div class="panel">
                    <p>
                      <!-- random "mocked" number -->
                      {{
                        Math.floor(Number(dataset.total) / 12).toLocaleString()
                      }}
                      resultaten gevonden voor '{{ selectedKeyword }}' in
                      {{ Number(dataset.total).toLocaleString() }} resultaten.
                    </p>
                    <p>{{ dataset.description }}</p>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </fieldset>
        <div class="buttons">
          <button
            class="small orange"
            :disabled="datasets.length === 0 ? true : false"
            @click.prevent="selectDatasets()"
          >
            Selecteer
          </button>
        </div>
      </form>
    </div>
    <div
      class="loader-wrapper"
      v-if="isLoading || (!isLoading && datasetReady)"
    >
      <p>
        De datasets worden doorzoekbaar gemaakt.<br />
        Afhankelijk van de datasets kan dit een tijd in beslag nemen, mogelijk
        enkele uren.
      </p>
      <LoadingSpinnerBar variant="bar" />
      <div class="buttons">
        <button
          class="small orange"
          :disabled="!datasetReady ? true : false"
          @click.prevent="startSearch()"
        >
          Datasets staan klaar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingSpinnerBar from '@/components/LoadingSpinnerBar.vue';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { searchStore } from '@/stores/search.store';

export interface Datasets {
  datasets: Dataset;
}

export interface Dataset {
  name: string;
  description?: string;
  total?: number;
}

const router = useRouter();
const datasetSummaries = ref<Datasets>({});
const store = searchStore();

const selectedKeyword = ref('');
const datasets = ref([]);
const isLoading = ref(false);
const datasetReady = ref(false);

function selectDatasets() {
  store.setSelectedDataset(datasets.value);
  isLoading.value = true;

  setTimeout(function () {
    isLoading.value = false;
    datasetReady.value = true;
  }, 10000);
}

function startSearch() {
  router.replace({
    name: 'search'
  });
}

function toggleSummary(event: {
  target: {
    classList: { toggle: (arg0: string) => void };
    nextSibling: { classList: { toggle: (arg0: string) => void } };
  };
}) {
  event.target.classList.toggle('show');
  event.target.nextSibling.classList.toggle('show');
}

function fetchDatasets() {
  fetch('datasetSummaries.json')
    .then((response) => response.json())
    .then((data) => {
      datasetSummaries.value = data.datasets;
    });
}

onMounted(() => {
  // is there a dataset search keyword?
  const keyword = store.getSelectedDatasetKeyword();
  selectedKeyword.value = keyword;
  // and is there a selected dataset?
  datasets.value = store.getSelectedDataset();

  if (keyword) {
    fetchDatasets();
  } else {
    router.push({
      name: 'search'
    });
  }
});
</script>

<style scoped>
.select-dataset-wrapper {
  width: 100%;
  margin-top: 1rem;
}

.select-dataset-wrapper label {
  display: block;
  line-height: 1;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.select-summary {
  margin-bottom: 1.5rem;
}

button.summary {
  box-shadow: none;
  border: 0;
  padding: 0;
  margin-left: 26px;
  margin-right: 0;
  display: flex;
  align-items: center;
}

button.summary::after {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: block;
  content: '';
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  margin-left: 1rem;
}

button.summary.show::after {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.panel {
  background: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  display: none;
}

.panel.show {
  width: 100%;
  display: table;
}

.panel p {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25;
  max-width: 75%;
}

.panel p:last-child {
  margin-bottom: 0;
}

.buttons button:disabled {
  background-color: #ccc;
}

.loader-wrapper {
  margin: 0 auto 3rem auto;
  width: 75vw;
}

.loader-wrapper p {
  max-width: 75%;
}

.loader-wrapper .buttons {
  margin-top: 2rem;
}

.loader-wrapper .buttons button {
  margin-right: 0;
}
</style>
