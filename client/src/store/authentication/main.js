/* eslint-disable */

import register from './register';
import login from './login';
import logout from './logout';

export default {

    namespaced: true,
    
    state: {
        token: null,
    },

    modules: {
        register,
        login,
        logout
    },

    mutations: {
        setToken(state, token) {
            state.token = token;
        }
    },

    getters: {
        isLoggedIn(state) {
            return !!state.token;
        }
    }

}