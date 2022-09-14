<template>
  <header>
    <img
      alt="Geheugen van Nederland"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
  </header>
  <main>
    <RouterView />
  </main>
  <SelectModal :is-visible="modalIsOpen" />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import SelectModal from '@/components/SelectModal.vue';
import { searchStore } from '@/stores/search.store';
import { computed } from 'vue';

const store = searchStore();
const modalIsOpen = computed(() => {
  return store.modalIsOpen;
});
</script>

<style scoped>
.logo {
  display: block;
  margin-bottom: 4rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .logo {
    width: 380px;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
