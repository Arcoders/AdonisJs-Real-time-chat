/* eslint-disable */

import Axios from '@/plugins/http';
import router from '@/router';

export default {

    namespaced: true,

    state: {
        chat: null,
    },

    actions: {

        getUser({ commit }, userId) {

            commit('setLoading', true);
            commit('setErrorLoad', false);

            return Axios().get(`/profile/get/${userId}`).then(({ data }) => {
                if (!data) return router.push('/profile');
                commit('setUserProfile', data);
                commit('setLoading', false);
            })
            .catch(() => {
                commit('setLoading', false);
                commit('setErrorLoad', true);
                router.push('/profile');
            })   

        },

    },

    mutations: {
        setChat(state, chat) {
            state.chat = {
                id: chat._id,
                name: chat.user.username,
                avatar: chat.user.avatar,
            };
        },
    },

}