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

            send(:showModal="showModal" @toggleModal="toggleModal")

</template>

<script>

import Axios from '@/plugins/http';
import messages from '@/components/rightSide/chat/messages';
import send from '@/components/rightSide/chat/send';
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {

    components: {
        messages,
        send,
    },

    watch: {
        rooms: {
            handler() {
                this.getChatByName();
            },
            deep: true,
        },
    },

    data() {
        return {
            showModal: false,
            photo: null,
            messages: [],
        }
    },

    mounted() {
        this.getChat();
    },

    methods: {
        ...mapMutations('chats/friend', ['setChat']),

        getChat() {
            let chat = this.$route.params.chat;
            if (chat) {
                this.setChat(chat);
                this.getMessages()
            }
        },

        getChatByName() {
            let chat = this.rooms.friends.find(friend => friend.user.username == this.friendName);
            if (!chat) this.$router.push('/home');
            this.setChat(chat);
            this.getMessages();
        },

        toggleModal(boolean) {
            this.showModal = boolean;
        },

        getMessages() {
            return Axios().get(`/messages/${this.$route.name}/${this.chat.id}`).then(({data}) => {
                if (data.messages.length === 0) return this.welcomeMessage();
                data.messages.reverse();
                data.messages.forEach(data => {
                        this.messages.push({
                            id: data.user._id,
                            name: data.user.username,
                            avatar: data.user.avatar,
                            photo: data.photo,
                            text: data.body,
                            time: data.created_at
                        });
                });
            })  
        },

        welcomeMessage() {
            this.messages.push({
                welcome: true,
                id: this.user._id,
                name: 'h i...',
                avatar: 'images/welcome.png',
                photo: null,
                text: 'Be the first to greet...',
                time: new Date()
            });
        },

    },
    
    computed: {
        ...mapState('chats/friend', ['chat']),
        ...mapState('rooms', ['rooms']),
        ...mapState('authentication', ['user']),

        friendName() {
            return this.$route.params.friend_name.replace('_', ' ');
        }
    }

}
</script>
