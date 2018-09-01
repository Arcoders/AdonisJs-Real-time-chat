/* eslint-disable */

import Axios from '@/plugins/http';
import EventBus from '@/plugins/eventBus';

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
                EventBus.$emit('errorMessage', {
                    id: rootState.authentication.user._id,
                    name: rootState.authentication.user.username,
                    avatar: rootState.authentication.user.avatar,
                    photo: state.photo,
                    text: state.body,
                    error: true
                });
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