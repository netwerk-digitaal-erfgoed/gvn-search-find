<template>
  <div>
    <div
      v-if="Object.keys(datasetSummaries).length > 0"
      class="search-form-container"
    >
      <form class="search-form">
        <fieldset>
          <label for="query">Zoek in één of meer datasets</label>
          <div class="select-dataset-wrapper">
            <template v-for="(dataset, index) in datasetSummaries" :key="index">
              <div class="select-summary">
                <label>
                  <input type="checkbox" name="dataset" value="" />
                  {{ dataset.name }}
                </label>
                <template v-if="dataset.summary">
                  <button class="small summary" @click.prevent="toggleSummary">
                    Toon/verberg samenvatting
                    <span class="arrow" />
                  </button>
                  <table v-if="dataset.summary.entities">
                    <tr>
                      <th>Entity</th>
                      <th>Density</th>
                      <th>Properties</th>
                    </tr>
                    <tr v-for="(e, no) in dataset.summary.entities" :key="no">
                      <td>{{ e.entity }}</td>
                      <td>{{ e.density }}%</td>
                      <td v-if="Object.keys(e.properties).length > 0">
                        <p
                          v-for="[key, value] of Object.entries(e.properties)"
                          :key="key"
                        >
                          {{ key }}: {{ value }}%
                        </p>
                      </td>
                    </tr>
                  </table>
                </template>
              </div>
            </template>
          </div>
        </fieldset>
        <div class="buttons">
          <button class="small orange" @click.prevent="selectDatasets()">
            Selecteer
          </button>
        </div>
      </form>
    </div>
    <div class="loader-wrapper">
      <LoadingSpinnerBar v-if="isLoading" variant="bar" />
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
  summary?: DatasetSummary;
}

export interface DatasetSummary {
  entities: Array<DatasetEntity>;
}

export interface DatasetEntity {
  entity: string;
  density: number;
  schema: string;
  properties: object;
}

const router = useRouter();
const datasetSummaries = ref<Datasets>({});
const store = searchStore();

const selectedTerm = ref();
const isLoading = ref(false);

function selectDatasets() {
  store.setSelectedDataset();
  isLoading.value = true;

  setTimeout(function () {
    isLoading.value = false;

    router.replace({
      name: 'search',
      query: {
        query: encodeURIComponent(selectedTerm.value.id),
        label: selectedTerm.value.matchingLabel
      }
    });
  }, 5000);
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
  // is there a selected term?
  const term = store.getSelectedTerm();
  if (term.id) {
    selectedTerm.value = term;
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
  margin-top: 2rem;
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

table {
  display: none;
}

table.show {
  width: 100%;
  display: table;
}

table tr td {
  background: rgba(255, 255, 255, 0.7);
}

table th,
table td {
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  text-align: left;
  vertical-align: top;
}

table th {
  font-weight: bold;
}

table p {
  font-size: 0.75rem;
  margin-bottom: 0;
}

.loader-wrapper {
  margin: 0 auto 3rem auto;
  width: 75vw;
}
</style>
