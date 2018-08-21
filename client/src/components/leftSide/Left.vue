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
            button(@click="toggleList()", v-bind:class="{ active: privateList }") Private
            button(@click="toggleList()", v-bind:class="{ active: !privateList }") Groups

        List(:privateList="privateList")

</template>

<script>

import Search from '@/components/leftSide/sections/Search.vue';
import List from '@/components/leftSide/sections/List.vue';
import { mapState, mapActions } from 'vuex';

export default {

  components: { Search, List },

  created() {
    this.chats();
    this.$eventBus.$on('filter', data => this.toggleList(data));
  },

  data() {
    return {
      privateList: true,
    };
  },

  methods: {
    ...mapActions('authentication/logout', ['logout']),
    ...mapActions('rooms', ['chats']),

    toggleList(filtred = null) {
      if (!filtred) return this.privateList = !this.privateList;
      (filtred.type === 'private') ? this.privateList = true : this.privateList = false;
    },

  },

  computed: {
    ...mapState('authentication', ['user']),
  },

};
</script>

<style scoped>
    .contact_list {
        height: calc(95vh - 155px);
        background-color: #ffffff;
    }
</style>
