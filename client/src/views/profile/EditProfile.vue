<template lang="pug">
    
    .edit_user

        form(method="POST" v-on:submit.prevent="" enctype="multipart/form-data")

            h1 Edit information

            input.info(type='text' :value="user.username" @input="setUsername"  placeholder='Username')

            input.info(type='text' :value="user.description" @input="setDescription" placeholder='Description')

            h1 Select avatar

            label.upload_profile
                .area
                    i.material-icons.edit_i photo_camera
                input(type="file" ref='fileAvatar')

            h1 Select cover

            label.upload_profile
                .area
                    i.material-icons.edit_i photo_size_select_actual
                input(type='file' name='fileCover' )

            button.save() Save

            loading()

</template>

<script>

import { mapState, mapMutations } from 'vuex';

export default {
    
    methods: {

        ...mapMutations('authentication', ['setUsername', 'setDescription'])

    },

    computed: {

        ...mapState('authentication', ['user']),

    }

}
</script>
