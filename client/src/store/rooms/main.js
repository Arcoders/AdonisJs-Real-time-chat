/* eslint-disable */

import Axios from '@/plugins/http';
const arraySort = require('array-sort');

export default {

    namespaced: true,

    state: {
        friends: [],
        groups: [],
        rooms: {
            friends: [],
            groups: [],
        },
        loading: false,
    },

    actions: {

        chats({ commit }) {

            commit('setLoading', true);

            return Axios().get('/chats').then(({ data }) => {
                commit('setRooms', data);
                commit('setLoading', false);
            })
            .catch(() => {
                commit('setLoading', false);
            })   

        },

    },

    mutations: {
        setRooms(state, data) {
            const friends = arraySort(data.friends, 'message.created_at').reverse();
            const groups = arraySort(data.groups, 'message.created_at').reverse();
            
            [state.friends, state.groups] = [friends, groups];
            [state.rooms.friends, state.rooms.groups] = [friends, groups];
        },
        setFiltered(state, data) {
            [state.rooms.friends, state.rooms.groups] = [data.friends, data.groups];
        },
        setLoading(state, boolean) {
            state.loading = boolean;
        },
    },


}