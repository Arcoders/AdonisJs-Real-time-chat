/* eslint-disable */

import router from '../../router';

export default {

    namespaced: true,

    actions: {

        logout({ commit }) {
            commit('authentication/setToken', null, { root: true })
            router.push('/login');
        }

    },

}