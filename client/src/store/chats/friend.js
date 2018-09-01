/* eslint-disable */

import Axios from '@/plugins/http';
import router from '@/router';

export default {

    namespaced: true,

    state: {
        chat: null,
    },

    actions: {

        //

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