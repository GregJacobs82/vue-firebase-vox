<template>
    <div>
        <h3>Chat Rooms</h3>
        <ul>
            <li v-for="chat in chats" :key="chat.id">
                <router-link :to="{ name: 'ChatRoom', params: { id: chat.id }}">
                    {{ chat.id }}
                </router-link>
            </li>
        </ul>
        <button class="btn btn-success" @click="createChatRoom()">
            Create New Chat Room
        </button>
    </div>
</template>

<script>
    import { db } from '../firebase';

    export default {
        props: {
            uid: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
               chats: [],
            };
        },
        firestore() {
            return {
                chats: db.collection('chats').where('owner', '==', this.uid),
            };
        },
        methods: {
            async createChatRoom() {
                const newChat = await db.collection('chats').add({
                    createdAt: Date.now(),
                    owner: this.uid,
                    members: [ this.uid ]
                });
                console.log(newChat);
            }
        }
    }
</script>

<style>

</style>