<template>
    <div class="container">
        <h3>Chat Room {{ chatId }}</h3>

        <!-- Using "#" allows for a template to be used per USER -->
        <!-- NOTE: We wrap everything in the <User> component bc a user must be logged in to chat -->
        <User #user="{ user }">
            <div class="col-lg-6 mx-auto bg-light rounded shadow-sm p-3">
                <div class="chat-box container-fluid" v-chat-scroll>

                    <!-- TODO: setup re-render on click to increase message limit
                    <div class="text-center my-5">
                        <button class="btn btn-link text-decoration-none" @click="increaseMessageLimit">
                            Load previous messages...
                        </button>
                    </div>-->
                    <template>
                        <ChatMessage
                            v-for="message in messages"
                            :key="message.id"
                            :sender="message.sender"
                            :text="message.text"
                            :time="message.createdAt"
                            :audio-url="message.audioURL"
                            :is-owner="user.uid === message.sender"
                        />
                    </template>
                </div>

                <div class="chat-sticky-footer">
                    <div v-if="newAudio" class="text-center p-2 pb-1 w-100 alert-success rounded-top">
                        <div class="d-flex align-items-center justify-content-between">
                            <small>Audio to be sent</small>
                            <div class="btn btn-link text-decoration-none text-danger" @click="newAudio = null">
                                <small>Cancel</small> <i class="fas fa-times-circle"></i>
                            </div>
                        </div>
                        <audio
                            :src="newAudioURL"
                            controls
                        />
                    </div>

                    <div class="input-group w-100">
                        <!-- TOGGLE AUDIO / TEXT -->
                        <button
                            class="btn btn-lg"
                            :class="messageIsAudio ? 'btn-dark' : 'btn-secondary'"
                            type="button"
                            @click="messageIsAudio = !messageIsAudio"
                        >
                            <i class="fas" :class="messageIsAudio ? 'fa-microphone-slash' : 'fa-microphone' "></i>
                        </button>

                        <!-- AUDIO: RECORD / STOP BUTTONS -->
                        <div v-if="messageIsAudio" class="input-group-text bg-dark border-0">
                            <!-- RECORD AUDIO -->
                            <button
                                v-if="!recorder"
                                class="btn btn-sm btn-danger"
                                type="button"
                                @click="startRecord()"
                            >
                                <i class="fas fa-circle"></i>
                            </button>
                            <!-- STOP AUDIO -->
                            <button
                                v-else
                                class="btn btn-sm btn-warning"
                                type="button"
                                @click="stopRecord()"
                            >
                                <i class="fas fa-stop"></i>
                            </button>
                        </div>

                        <!-- TEXT MESSAGE INPUT -->
                        <input
                            v-model="newMessageText"
                            type="text"
                            class="form-control"
                            placeholder="Message..."
                            aria-label="New Message"
                            aria-describedby="button-addon2"
                            maxlength="500"
                            @keypress.enter="sendMessage(user.uid)"
                        >

                        <!-- SEND MESSAGE -->
                        <button
                            :disabled="loading"
                            class="btn btn-success"
                            type="button"
                            id="button-addon2"
                            @click="sendMessage(user.uid)"
                        >
                            Send
                        </button>
                    </div>
                </div>

            </div>
        </User>
    </div>
</template>

<script>
    import User from './User';
    import { db, storage } from '../firebase';
    import ChatMessage from './ChatMessage';
    import moment from 'moment';

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
                messageIsAudio: false,
                messageLimit: 10,
                messageLimitIncrement: 10,
            };
        },
        firestore() {
            return {
                messages: this.messagesCollection.orderBy('createdAt').limitToLast(this.messageLimit),
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
            },
        },
        methods: {
            /* TODO: setup re-render method to update message list based on new messageLimit, and fetch previous messages */
            getTenMoreMessages() {
                //loading=true;
                this.messageLimit = this.messageLimit + this.messageLimitIncrement;
                //get offset data based on new messageLimit
                //push to array
                //loading.false
            },
            sendMessage(uid) {
                let messageExists = (this.newMessageText || this.newAudio);
                if (messageExists && !this.loading) {
                    this.addMessage(uid);
                }
            },
            async addMessage(uid) {
                this.loading = true;

                let audioURL = null;

                // this doesnt create the message yet, just a reference to the message
                const { id: messageId } = this.messagesCollection.doc();

                if (this.newAudio) {
                    const storageRef = storage
                        .ref('chats')
                        .child(this.chatId)
                        .child(`${messageId}.wav`);

                    await storageRef.put(this.newAudio);

                    audioURL = await storageRef.getDownloadURL();
                }

                // this sets the message to the DB
                await this.messagesCollection.doc(messageId).set({
                    text: this.newMessageText,
                    sender: uid,
                    createdAt: moment().toISOString(), // Date.now(),
                    audioURL,
                })

                this.loading = false;
                this.newMessageText = '';
                this.newAudio = null;
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
    audio {
        max-width: 100%;
    }
    .chat-box {
        height: 25rem;
        width: 100%;
        overflow: auto;
    }

    .chat-sticky-footer {
        bottom: 0;
        left: 0;
        width: 100%;
    }
</style>