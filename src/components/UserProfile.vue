<template>
    <div>
        <div class="mb-3">
            User ID: {{ user.uid }}
            <div v-if="user.metadata" class="text-black-50">
                <small>Created: {{ user.metadata.creationTime }}</small>
            </div>
        </div>

        <button class="btn btn-primary" @click="auth.signOut()">
            Sign Out
        </button>
    </div>
</template>

<script>
    import { auth } from '../firebase';

    export default {
        props: {
            user: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                auth
            };
        }
    }
</script>

<style>

</style>