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

        getGroup({ commit, rootGetters }, groupId) {

            commit('setLoading', true);
            const userId = rootGetters['authentication/userId'];
            
            return Axios().get(`/groups/${userId}/${groupId}`).then(({ data }) => {
                commit('setFriends', data.friends);
                commit('setGroupInformation', data.group);
                commit('setLoading', false);
            })
            .catch(() => {
                EventBus.$emit('snotifyError', 'Could not load group Infomation');
                commit('setLoading', false);
            })   

        },

        saveGroup({ commit, state }, groupId) {

            commit('setLoading', true);

            return Axios().patch(`/groups/${groupId}`, {
                name: state.groupName,
                usersId: state.selectedIds,
                avatar: state.avatar,
            })
            .then(({ data }) => {
                console.log(data)
                commit('setLoading', false);
                EventBus.$emit('snotifyDone', data.status);
            })
            .catch(error => {
                commit('setLoading', false);
                let message = 'An error has occurred';
                if (error.response.status === 422) {
                    message = error.response.data.shift().message;
                    return EventBus.$emit('snotifyWarning', message);
                }
                EventBus.$emit('snotifyError', message);
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
        },
        setGroupInformation(state, group) {
            state.groupName = group.name;
            state.avatar = group.avatar;
            state.selectedUsers = group.users;
        },
    },

    getters: {
        highlightAvatar(state) {
            return (state.groupName === '') ? '#EEEEEE' : null;
        },
        buttonDisabled(state) {
            return (state.groupName.length < 3);
        }
    }


}