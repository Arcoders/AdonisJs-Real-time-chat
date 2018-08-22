<template lang="pug">

    .wrap

        router-link.navigate(to='#')
            i.material-icons arrow_back

        .left
            Left

        .right
            router-view(:key='$route.fullPath')

        vue-snotify

</template>

<script>

import Left from '@/components/leftSide/Left.vue';
import EventBus from '@/plugins/eventBus';

export default {

  components: { Left },

  created() {
    this.snotifyDone();
    this.snotifyError();
  },

  methods: {
    snotifyDone() {
      EventBus.$on('snotifyDone', msg => this.$snotify.success(msg, 'Done'));
    },
    snotifyError() {
      EventBus.$on('snotifyError', msg => this.$snotify.error(msg, 'Oups'));
    },
  },

};
</script>
