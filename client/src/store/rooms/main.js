/* eslint-disable */

import Axios from '../../http';

export default {

    namespaced: true,

    state: {
        friends: [],
        groups: [],
        filteredFriends: [],
        filteredGroups: [],
        loading: false,
    },

    actions: {

        chats({ commit }) {

            commit('setLoading', true);

            return Axios().get('/chats').then(({ data }) => {
                commit('setFriends', data.friends);
                commit('setGroups', data.groups);
                commit('setFiltered', data);
                commit('setLoading', false);
            })
            .catch(() => {
                commit('setLoading', false);
            })   

        },

    },

    mutations: {
        setFriends(state, friends) {
            state.friends = friends;
        },
        setGroups(state, groups) {
            state.groups = groups;
        },
        setFiltered(state, data) {
            state.filteredFriends = data.friends;
            state.filteredGroups = data.groups;
        },
        setLoading(state, boolean) {
            state.loading = boolean;
        },
    },


}