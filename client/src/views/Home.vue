<template lang="pug">

  .home
    router-link(to='/register' v-if='!isLoggedIn') Register
    span(v-if='isLoggedIn') Welcome

</template>

<script>

import { mapGetters } from 'vuex';

export default {

  computed: {

    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),

  },

};

</script>
