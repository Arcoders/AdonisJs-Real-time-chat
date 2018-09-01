/* eslint-disable */

import router from '@/router';
import Axios from '@/plugins/http';

export default {

    namespaced: true,

    state: {
        chat: null,
        messages: [],
        showModal: false,
        photo: null,
    },

    actions: {

        getMessages({ state, rootState, commit }) {

            const url = `/messages/${rootState.route.name}/${state.chat.id}`;

            return Axios().get(url).then(({data}) => {

                if (data.messages.length === 0) return commit('welcomeMessage', rootState.authentication.user._id);

                data.messages.reverse().forEach(data => commit('pushConversation', data));

            }).catch(error =>  console.log(error));
        },

        getChat({ state, rootState, commit, dispatch }) {
            let chat = rootState.route.params.chat;
            if (!chat) return;
            commit('setChat', chat);
            dispatch('getMessages');
        },

        getChatByUserName({ state, rootState, commit, dispatch, getters }) {
            let chat = rootState.rooms.friends.find(friend => friend.user.username == getters.friendName);
            if (!chat) return router.push('/home');
            commit('setChat', chat);
            dispatch('getMessages');
        }

    },

    mutations: {
        setModal(state, boolean) {
            state.showModal = boolean;
        },
        setPhoto(state, boolean) {
            state.photo = boolean;
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
        errorMessage(state, data, rootState) {
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
        }
    }

}