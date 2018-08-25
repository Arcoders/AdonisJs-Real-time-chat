/* eslint-disable */

import Axios from '@/plugins/http';

import edit from './edit';

export default {

    namespaced: true,

    modules: {
        edit,
    },

    state: {
        users: [],
        loading: false,
        errorLoad: false,
        userProfile: undefined,
        defaultCover: 'images/default_cover.jpg'
    },

    actions: {

        getUsers({ commit }) {

            commit('setLoading', true);
            commit('setErrorLoad', false);

            return Axios().get('/profile').then(({ data }) => {
                commit('setUsers', data);
                commit('setLoading', false);
            })
            .catch(() => {
                commit('setLoading', false);
                commit('setErrorLoad', true);
            })   

        },

    },

    mutations: {
        setUsers(state, users) {
            users.sort(() => Math.random() - 0.5);
            if (users.length >= 8) users = users.slice(0, 8);
            state.users = users;
        },
        setUserProfile(state, user) {
            state.userProfile = user
        },
        setLoading(state, boolean) {
            state.loading = boolean;
        },
        setErrorLoad(state, boolean) {
            state.errorLoad = boolean;
        },
    },

    getters: {
        records(state) {
            return (state.users.length !== 0);
        }
    },

}