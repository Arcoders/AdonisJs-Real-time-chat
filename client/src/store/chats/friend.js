/* eslint-disable */

import router from '@/router';
import Axios from '@/plugins/http';

export default {

    namespaced: true,

    state: {
        chat: null,
        messages: [],
        modal: false,
    },

    actions: {

        getMessages({ state, rootState, commit }) {

            const userId = rootState.authentication.user._id;
            const url = `/messages/${rootState.route.name}/${state.chat.id}`;

            return Axios().get(url).then(({data}) => {

                if (data.messages.length === 0) return commit('welcomeMessage', userId);
                data.messages.reverse().forEach(data => commit('pushConversation', data));

            }).catch(() => commit('welcomeMessage', userId));
        },

        getChat({ state, rootState, commit, dispatch, getters }) {
            let chat = rootState.route.params.chat || getters.getChatByUserName;
            if (rootState.rooms.roomsDone && !chat) router.push('/home');
            if (chat) {
                commit('setChat', chat);
                dispatch('getMessages');
            }
        },

    },

    mutations: {
        toggleModal(state) {
            state.modal = !state.modal;
        },
        setChat(state, chat) {
            state.chat = {
                id: chat._id,
                name: chat.user.username,
                avatar: chat.user.avatar,
            };
            state.messages = [];
        },
        welcomeMessage(state, userId) {
            state.messages.push({
                welcome: true,
                id: userId,
                name: 'h i...',
                avatar: 'images/welcome.png',
                photo: null,
                text: 'Be the first to greet...',
                time: new Date()
            });
        },
        errorMessage(state, data) {
            state.messages.push({
                id: data.user._id,
                name: data.user.username,
                avatar: data.user.avatar,
                photo: data.photo,
                text: data.body,
                error: true
            });
        },
        pushConversation(state, data) {
            
            if (state.messages.length !== 0 && state.messages[0]['welcome']) state.messages.shift();

            state.messages.push({
                id: data.user._id,
                name: data.user.username,
                avatar: data.user.avatar,
                photo: data.photo,
                text: data.body,
                time: data.created_at
            });

        },
    },

    getters: {
        friendName(state, getters, rootState) {
            return rootState.route.params.friend_name.replace('_', ' ');
        },
        getChatByUserName(state, getters, rootState) {
            return rootState.rooms.friends.find(friend => friend.user.username == getters.friendName);
        }
    }

}