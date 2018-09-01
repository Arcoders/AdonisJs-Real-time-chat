/* eslint-disable */

import Axios from '@/plugins/http';

export default {

    namespaced: true,

    state: {
        body: '',
        photo: null,
    },

    actions: {

        send({ commit, state, rootState, getters }) {

            if (getters.invalid) return;

            return Axios().post('/messages/send', {
                body: state.body,
                photo: state.photo,
                roomName: rootState.route.name,
                chatId: rootState.chats.friend.chat.id,
            })
            .then(() => {
                commit('reset');
            }).catch(() => {
                commit('chats/friend/errorMessage', {
                    user: rootState.authentication.user,
                    photo: state.photo,
                    body: state.body,
                }, { root: true });
                commit('reset');
            });
            
        },

    },

    mutations: {
        setBody(state, e) {
            state.body = e.target.value;
        },
        reset(state) {
            state.body = '';
        }
    },

    getters: {
        invalid(state) {
            return (state.body.length < 2);
        },
    },

}