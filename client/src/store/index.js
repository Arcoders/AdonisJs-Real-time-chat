
// import presistedState from 'vuex-persistedstate';
import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './authentication/main';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: '/api',
  },
  modules: {
    authentication,
  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    // presistedState(),
  ],
});
