/* eslint-disable */

import register from './register';
import login from './login';
import logout from './logout';

export default {

    namespaced: true,
    
    state: {
        token: null,
        user: null,
    },

    modules: {
        register,
        login,
        logout
    },

    mutations: {
        setUser(state, data) {
            state.token = data.token
            state.user = data.user;
        }
    },

    getters: {
        isLoggedIn(state) {
            return !!state.token;
        }
    }

}