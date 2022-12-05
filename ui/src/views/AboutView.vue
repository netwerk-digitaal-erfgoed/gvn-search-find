<template>
  <div class="text-container">
    <h1>Over dit prototype</h1>
    <p>Dit prototype onderzoekt de mogelijkheden om op uniforme wijze te zoeken in gestructureerde gegevens van digitale erfgoedcollecties. Een eindgebruiker zoekt naar erfgoedobjecten met behulp van een zoekfunctionaliteit op basis van termen. </p>
    <p>In de huidige versie van dit prototype zoekt de eindgebruiker aan de hand van één termenlijst, de cultuurhistorische thesaurus van de Rijksdienst voor het Cultureel Erfgoed. De lijst van termen in de zoekfunctionaliteit bestaat enkel uit termen waaraan objecten gekoppeld zijn. Dat betekent dat ogenschijnlijk vanzelfsprekende termen als “koffie” niet voorkomen. De eindgebruiker vindt resultaten uit één collectie, die van Museum Rotterdam. </p>
    <p>De snelheid van het zoeken en tonen van resultaten is in deze versie nog niet geoptimaliseerd. Dat betekent dat de eindgebruiker soms moet wachten na een zoekvraag. Bij algemene termen, zoals “meubilair” kan het voorkomen dat zoeken een foutmelding geeft. </p>
    <router-link to="/search" class="button white small">
      Naar zoekformulier
    </router-link>
  </div>
</template>

<script setup lang="ts">
import SelectDataset from '@/components/SelectDataset.vue';
</script>
