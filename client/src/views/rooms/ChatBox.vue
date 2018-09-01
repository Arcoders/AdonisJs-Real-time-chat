<template lang="pug">
   
    transition(name='slide-fade') 
        .chat(v-if="chat")

            .head

                avatar.img(:username="chat.name" :src="chat.avatar" color="#fff")

                .info

                    p {{ chat.name }}
                    p.online Offline
                        span.state.red &#8226;

            .chat_box

                .chat_content#chat

                    messages(:messages="messages")

                .modal(v-if="showModal")

                    .container(v-if="!photo")
                        label.upload_photo
                            i.material-icons file_upload
                            input(type="file")

                    .container(v-else)
                        .preview
                            img(:src="photo")
                            a(@click="photo = null")
                                i.material-icons clear

            send(:showModal="showModal" @toggleModal="setModal")

</template>

<script>

import Axios from '@/plugins/http';
import EventBus from '@/plugins/eventBus';
import messages from '@/components/rightSide/chat/messages';
import send from '@/components/rightSide/chat/send';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {

    components: {
        messages,
        send,
    },

    watch: {
        rooms: {
            handler() {
                this.getChatByUserName();
            },
            deep: true,
        },
        chat: {
            handler() {
                this.listenRealTimeMessage()
            },
        },
    },

    mounted() {
        this.getChat();
    },

    methods: {
        ...mapActions('chats/friend', ['getMessages', 'getChat', 'getChatByUserName']),
        ...mapMutations('chats/friend', ['setChat', 'pushConversation', 'setModal', 'setPhoto']),

        listenRealTimeMessage() {
            this.$pusher.subscribe(`${this.$route.name}${this.chat.id}`).bind('newMessage', (message) => {
                this.pushConversation(message);
            });
        },

    },
    
    computed: {
        ...mapState('chats/friend', ['chat', 'messages', 'showModal', 'photo']),
        ...mapState('rooms', ['rooms']),
        ...mapState('authentication', ['user']),
        ...mapGetters('chats/friend', ['friendName']),
    }

}
</script>
