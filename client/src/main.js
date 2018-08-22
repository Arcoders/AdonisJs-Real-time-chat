
import { sync } from 'vuex-router-sync';
import VueTruncate from 'vue-truncate-filter';
import Avatar from 'vue-avatar';
import Multiselect from 'vue-multiselect';
import VueMoment from 'vue-moment';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import Loading from './components/spinner/Loading.vue';
import './assets/sass/app.scss';

Vue.use(VueTruncate);
Vue.use(VueMoment);

const snotifyOptions = {
  toast: {
    position: SnotifyPosition.rightTop,
  },
};

Vue.use(Snotify, snotifyOptions);

Vue.component('Avatar', Avatar);
Vue.component('Loading', Loading);
Vue.component('multiselect', Multiselect);

Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue();

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
