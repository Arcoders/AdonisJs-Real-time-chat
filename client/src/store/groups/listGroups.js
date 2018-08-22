/* eslint-disable */

import Axios from '../../http';
import EventBus from '@/plugins/eventBus';

export default {

    namespaced: true,

    state: {
        groups: [],
        loading: false,
        errorLoad: false,
    },

    actions: {

        listGroups({ commit }, page = 1) {

            commit('setLoading', true);
            commit('setErrorLoad', false);

            return Axios().get(`/groups?page=${page}`).then(({ data }) => {
                commit('setGroups', data);
                commit('setLoading', false);
            })
            .catch(() => {
                commit('setLoading', false);
                commit('setErrorLoad', true);
            })   

        },

        deleteGroup({ commit }, groupId) {

            commit('setLoading', true);
            commit('setErrorLoad', false);

            return Axios().delete(`/groups/${groupId}`).then(({ data }) => {
                commit('setLoading', false);
                EventBus.$emit('snotifyDone', data.status);
            })
            .catch(() => {
                commit('setLoading', false);
                EventBus.$emit('snotifyError', 'An error has occurred');
            })   

        },


    },

    mutations: {
        setGroups(state, groups) {
            state.groups = groups;
        },
        setLoading(state, boolean) {
            state.loading = boolean;
        },
        setErrorLoad(state, boolean) {
            state.errorLoad = boolean;
        },
    },

    getters: {
        notFound(state) {
            return (!state.groups  || state.groups.length === 0);
        }
    },


}