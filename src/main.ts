import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import SimpleTypeahead from 'vue3-simple-typeahead';
import 'vue-progressive-image/dist/style.css';

import './assets/main.css';
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia); // todo: check if the store is still neccessary
app.use(SimpleTypeahead);

app.mount('#app');
