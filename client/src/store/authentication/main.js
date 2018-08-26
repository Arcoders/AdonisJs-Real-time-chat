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
            localStorage.setItem('FreezedUser', JSON.stringify(data.user));
        },
        setUsername(state, e) {
            state.user.username = e.target.value;
        },
        setDescription(state, e) {
            state.user.description = e.target.value;
        },
        resetUser(state) {
            state.user = JSON.parse(localStorage.getItem('FreezedUser'));
        }
    },

    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
        user(state) {
            return state.user;
        },
        userId(state) {
            if (state.user) return state.user._id;
        }
    }

}