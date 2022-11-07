<template>
  <header>
    <router-link to="/">
      <img
        alt="Geheugen van Nederland"
        class="logo"
        src="@/assets/logo.svg"
        width="75"
        height="75"
      />
    </router-link>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style scoped>
.logo {
  display: block;
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .logo {
    width: 380px;
  }
}
</style>
