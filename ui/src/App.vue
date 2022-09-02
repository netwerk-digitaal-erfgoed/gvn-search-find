<template>
  <header>
    <img
      alt="Geheugen van Nederland"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
    <!--<Intro /> -->
    <!--<div class="wrapper">
      <nav>
        <RouterLink to="/">Erfgoedzoeker</RouterLink>
        <RouterLink to="/search-filters">Zoeken met filters</RouterLink>
      </nav>
    </div>-->
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Intro from './components/Intro.vue';
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
