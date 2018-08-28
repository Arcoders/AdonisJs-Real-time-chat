<template lang="pug">

    .contact_list

        Loading(v-if='loading' :normal='true')

        .contact(v-if="privateList" v-for='friend in rooms.friends')

            router-link(exact-active-class='active_image' :to="{name: 'profile', params: {profileId: friend.user._id}}")
                Avatar.avatar(:username='friend.user.username'  :src='friend.user.avatar' color='#fff')

            .preview
                .text
                    h5
                        router-link(exact-active-class='active_chat' to="/")
                            | {{ friend.user.username }}
                    h6
                        router-link(exact-active-class='active_message' to="/")
                            span(v-if="friend.message")
                                span(v-if="friend.message.body && friend.message.photo")
                                    i.material-icons.photo photo
                                    | {{ friend.message.body | truncate(20) }}
                                span(v-else-if="friend.message.body") {{ friend.message.body | truncate(20) }}
                                span(v-else-if="friend.message.photo")
                                    i.material-icons.photo photo
                                    | a photo has been shared
                            span(v-else) Empty chat...

            .time
                p(v-if="friend.message") {{ friend.message.created_at | moment('H:mm') }}
                i.material-icons(v-else) fiber_new


        .contact(v-if='!privateList' v-for='group in rooms.groups')

            router-link(exact-active-class='active_image' to="/")
                avatar.avatar(:username='group.name' :src='group.avatar' color='#fff')

            .preview
                .text
                    h5
                        router-link(exact-active-class='active_chat' to="/")
                            | {{ group.name }}
                    h6
                        router-link(exact-active-class='active_message' to="/")
                            span(v-if='group.message')
                                span(v-if='group.message.body && group.message.photo')
                                    i.material-icons.photo photo
                                    | {{ group.message.body | truncate(35) }}
                                span(v-else-if='group.message.body') {{ group.message.body | truncate(20) }}
                                span(v-else-if='group.message.photo')
                                    i.material-icons.photo photo
                                    | a photo has been shared
                            span(v-else) Empty group...

            .time
                p(v-if='group.message') {{ group.message.created_at | moment('H:mm') }}
                i.material-icons(v-else) fiber_new

        .contact(v-if='groupsNotFound && !loading')
            p.middle groups not found

        .contact(v-if='friendsNotFound && !loading')
            p.middle friends not found

</template>

<script>

import { mapState, mapMutations } from 'vuex';

export default {

  props: ['privateList'],

  created() {
    this.updateList();
  },

  methods: {

    ...mapMutations('rooms', ['setFiltered']),

    updateList() {
      this.$eventBus.$on('filter', data => this.setFiltered(data));
    },

  },

  computed: {

    ...mapState('rooms', ['rooms', 'loading']),

    groupsNotFound() {
      return (!this.privateList && this.rooms.groups && this.rooms.groups.length === 0);
    },

    friendsNotFound() {
      return (this.privateList && this.rooms.friends && this.rooms.friends.length === 0);
    },

  },

};

</script>
