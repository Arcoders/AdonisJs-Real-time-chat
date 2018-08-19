<template lang="pug">

    .auth
        h2 Register
        .form
            input(
                type="email"
                placeholder="Email"
                :value="registerEmail"
                @input="setRegisterEmail"
                )
            input(
                type="text"
                placeholder="Username"
                :value="registerUsername"
                @input="setRegisterUsername"
                )
            input(
                type="password"
                placeholder="Password"
                :value="registerPassword"
                @input="setRegisterPassword"
                )
            input(
                type="password"
                placeholder="Confirm your password"
                :value="registerConfirmedPassword"
                @input="setConfirmedPassword"
                )
            button(@click="register") Register

            span(:value="registerError") {{ registerError }}

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {

  methods: {

    ...mapMutations('authentication', [
      'setRegisterEmail',
      'setRegisterUsername',
      'setRegisterPassword',
      'setConfirmedPassword',
    ]),

    ...mapActions('authentication', [
      'register',
    ]),

  },

  computed: {

    ...mapState('authentication', [
      'registerEmail',
      'registerUsername',
      'registerPassword',
      'registerConfirmedPassword',
      'registerError',
    ]),

  },

};
</script>
