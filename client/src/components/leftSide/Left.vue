<template lang="pug">

    .left_app

        .menu
            router-link(to="/profile")
                Avatar.avatar(:username="user.username", color="#fff", :src="user.avatar")

            router-link(to="/profile") {{ user.username | truncate(15)}}

            .icons
                router-link(to="/groups")
                    i.material-icons person_add

                a.notifications(data-badge="8")
                    i.material-icons notifications

                a(@click="logout")
                    i.material-icons fingerprint

        Search

        .filter
            button(@click="toggle", v-bind:class="{ active: privateList }") Private
            button(@click="toggle", v-bind:class="{ active: !privateList }") Groups

        List(:privateList="privateList")

</template>

<script>

import Search from '@/components/leftSide/sections/Search.vue';
import List from '@/components/leftSide/sections/List.vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {

  components: { Search, List },

  created() {
    this.chats().then(() => this.listenMessageEvent());
    this.$eventBus.$on('filter', data => this.toggle(data.type));
    this.$pusher.subscribe(`user${this.user._id}`).bind('refreshList', data => this.changeTo(data));
  },

  methods: {
    ...mapActions('authentication/logout', ['logout']),
    ...mapActions('rooms', ['chats', 'toggle', 'changeTo']),
    ...mapMutations('rooms', ['setPreviewMessageAndPushUp']),

    listenMessageEvent() {
        this.friendsId.forEach(friendId => {
            this.$pusher.subscribe(`friend_chat${friendId}`).bind('newMessage', message => {
                this.setPreviewMessageAndPushUp({
                    message,
                    type: 'friends'
                });
            });
        });
    },

  },

  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('rooms', ['privateList', 'friendsId']),
  },

};
</script>

<style scoped>
    .contact_list {
        height: calc(95vh - 155px);
        background-color: #ffffff;
    }
</style>
