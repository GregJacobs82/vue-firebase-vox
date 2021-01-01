<template>
    <div class="container">
        <h3>Chat Room {{ chatId }}</h3>

        <!-- Using "#" allows for a template to be used per USER -->
        <!-- NOTE: We wrap everything in the <User> component bc a user must be logged in to chat -->
        <User #user="{ user }">
            <div class="col-lg-6 mx-auto bg-light rounded shadow-sm p-3">
                <div v-for="message in messages" :key="message.id">
                    <ChatMessage
                        :sender="message.sender"
                        :text="message.text"
                        :is-owner="user.uid === message.sender"
                    />
                </div>

                <div v-if="newAudio" class="text-center p-2 pb-1 w-100 mb-1 alert-danger">
                    <audio
                        :src="newAudioURL"
                        controls
                    />
                </div>

                <div class="input-group w-100">
                    <!-- TOGGLE AUDIO / TEXT -->
                    <button
                        class="btn btn-info text-white active"
                        type="button"
                    >
                        Audio
                    </button>

                    <!-- RECORD AUDIO -->
                    <button
                        v-if="!recorder"
                        class="btn btn-danger"
                        type="button"
                        @click="startRecord()"
                    >
                        Record
                    </button>
                    <!-- STOP AUDIO -->
                    <button
                        v-else
                        class="btn btn-success"
                        type="button"
                        @click="stopRecord()"
                    >
                        Stop
                    </button>

                    <!-- TEXT MESSAGE INPUT -->
                    <input
                        v-if="!newAudio"
                        v-model="newMessageText"
                        type="text"
                        class="form-control"
                        placeholder="Message..."
                        aria-label="New Message"
                        aria-describedby="button-addon2"
                        @keypress.enter="sendMessage(user.uid)"
                    >

                    <!-- SEND MESSAGE -->
                    <button
                        :disabled="!newMessageText || loading"
                        class="btn btn-secondary"
                        type="button"
                        id="button-addon2"
                        @click="sendMessage(user.uid)"
                    >
                        Send
                    </button>
                </div>

            </div>
        </User>
    </div>
</template>

<script>
    import User from './User';
    import { db } from '../firebase';
    import ChatMessage from './ChatMessage';

    export default {
        components: {
            User,
            ChatMessage,
        },
        data() {
            return {
                newMessageText: '',
                loading: false,
                messages: [],
                newAudio: null,
                recorder: null,
            };
        },
        firestore() {
            return {
                messages: this.messagesCollection.orderBy('createdAt').limitToLast(10),
            }
        },
        computed: {
            chatId() {
                return this.$route.params.id;
            },
            messagesCollection() {
                return db.doc(`chats/${this.chatId}`).collection('messages');
            },
            newAudioURL() {
                return URL.createObjectURL(this.newAudio);
            }
        },
        methods: {
            sendMessage(uid) {
                if (this.newMessageText && !this.loading) {
                    this.addMessage(uid);
                }
            },
            async addMessage(uid) {
                this.loading = true;

                // this doesnt create the message yet, just a reference to the message
                const { id: messageId } = this.messagesCollection.doc();

                // this sets the message to the DB
                await this.messagesCollection.doc(messageId).set({
                    text: this.newMessageText,
                    sender: uid,
                    createdAt: Date.now(),
                })

                this.loading = false;
                this.newMessageText = '';
            },
            async startRecord() {
                this.newAudio = null;
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                const options = { mimeType: "audio/webm" };
                const recordedChunks = [];

                this.recorder = new MediaRecorder(stream, options);

                this.recorder.addEventListener("dataavailable", e => {
                    if (e.data.size > 0) {
                        recordedChunks.push(e.data);
                    }
                });

                this.recorder.addEventListener("stop", () => {
                    this.newAudio = new Blob(recordedChunks);
                    console.log(this.newAudio);
                });

                this.recorder.start()
            },
            async stopRecord() {
                this.recorder.stop();
                this.recorder = null;
            }
        }
    }
</script>

<style>

</style>