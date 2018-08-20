<template lang="pug">

    .wrap

        router-link.navigate(to='#')
            i.material-icons arrow_back

        .left
            Left

        .right
            router-view(:key='$route.fullPath')

</template>

<script>

import Left from '@/components/leftSide/Left.vue';

export default {

  components: { Left },

};
</script>
