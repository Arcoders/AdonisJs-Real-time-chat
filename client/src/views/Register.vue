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
            button Register

</template>

<script>

import { mapState, mapMutations } from 'vuex';

export default {

     methods: {
         ...mapMutations('authentication', [
             'setRegisterEmail',
             'setRegisterPassword',
             'setConfirmedPassword'
         ])
     },

     computed: {
         ...mapState('authentication', [
             'registerEmail',
             'registerPassword',
             'registerConfirmedPassword'
         ])
     }

}

</script>
