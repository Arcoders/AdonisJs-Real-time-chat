/* eslint-disable */

import Axios from '../http';
import router from '../router';

export default {

    namespaced: true,
    
    state: {
        registerEmail: null,
        registerUsername: null,
        registerPassword: null,
        registerConfirmedPassword: null,
        registerError: null,
        token: null
    },

    actions: {

        register({ commit, state }) {
            return Axios().post('/auth/register', {
                email: state.registerEmail,
                username: state.registerUsername,
                password: state.registerPassword,
                password_confirmation: state.registerConfirmedPassword
            })
            .then(({ data }) => {
                commit('setToken', data.token);
                router.push('/');
            })
            .catch(error => {
                let message = 'An error has occurred';
                if (error.response.status === 422) message = error.response.data.shift().message
                commit('setRegisterError', message)
            })   
        }

    },

    mutations: {
        setRegisterEmail(state, e) {
            state.registerEmail = e.target.value;
        },
        setRegisterUsername(state, e) {
            state.registerUsername = e.target.value;
        },
        setRegisterPassword(state, e) {
            state.registerPassword = e.target.value;
        },
        setConfirmedPassword(state, e) {
            state.registerConfirmedPassword = e.target.value;
        },
        setRegisterError(state, error) {
            state.registerError = error
        },
        setToken(state, token) {
            state.token = token;
        }
    },

    getters: {
        isLoggedIn(state) {
            return !!state.token
        }
    }

}