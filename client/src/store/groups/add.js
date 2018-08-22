/* eslint-disable */

import Axios from '@/plugins/http';
import EventBus from '@/plugins/eventBus';

export default {

    namespaced: true,

    state: {
        avatar: null,
        groupName: '',
        friends: [],
        selectedUsers: [],
        selectedIds: [],
    },

    actions: {

        getFriends({ commit, rootGetters }) {

            commit('setLoading', true);

            const userId = rootGetters['authentication/userId'];

            return Axios().get(`/groups/${userId}`).then(({ data }) => {
                commit('setFriends', data.friends);
                commit('setLoading', false);
            })
            .catch(() => {
                EventBus.$emit('snotifyError', 'Could not load friend list');
                commit('setLoading', false);
            })   

        },

    },

    mutations: {
        setGroupName(state, e) {
            state.groupName = e.target.value;
        },
        setFriends(state, friends) {
            state.friends = friends;
        },
        setSelectedUsers(state, selectedUsers) {
           state.selectedUsers = selectedUsers;
        },
        setSelectedIds(state, selectedIds) {
            state.selectedIds = selectedIds;
        },
        setLoading(state, boolean) {
            state.loading = boolean;
        }
    },

    getters: {
        highlightAvatar(state) {
            return (state.groupName === '') ? '#EEEEEE' : '';
        },
    }


}