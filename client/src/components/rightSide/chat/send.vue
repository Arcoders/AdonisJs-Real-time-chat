<template lang="pug">
    
    form.send(method='POST' enctype='multipart/form-data')

        button(type='button' @click='toggleModal')

            i(v-bind:class="[showModal ? 'green' : '', 'material-icons']") photo_camera

        .message
            input#msg(autocomplete='off' placeholder='Write a new message')

        button(type='button')

            i(v-bind:class="['green', 'material-icons']") send

</template>

<script>
export default {
    
     props: ['showModal'],

     methods: {

         toggleModal() {
            this.$emit('toggleModal', !this.showModal);
        },

     }

}
</script>
