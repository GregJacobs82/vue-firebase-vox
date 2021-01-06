<template>
    <div>
        <h3>User Profile</h3>
        <div class="mb-3">
            <div>User AUTH ID: {{ uid }}</div>
            <div v-if="creationTime" class="text-black-50">
                <small>Created: {{ creationTime }}</small>
            </div>
            <hr>
            <div>User COLLECTION ID: {{ user.user_id }}</div>
            <div>Display Name: {{ user.displayName }}</div>
        </div>

        <button class="btn btn-danger" @click="auth.signOut()">
            Sign Out
        </button>
    </div>
</template>

<script>
    import { auth } from '../firebase';

    export default {
        props: {
            uid: {
                type: String,
                required: true,
            },
            creationTime: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                auth,
                user: {
                    user_id: "dummy12345324",
                    displayName: "dummyFrank",
                },
            };
        },
        // created() {
        //     this.user = db.collection('users').where('user_id', '==', this.uid);
        // },
    }
</script>

<style>

</style>