
import { sync } from 'vuex-router-sync';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './assets/sass/app.scss';

Vue.config.productionTip = false;

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
