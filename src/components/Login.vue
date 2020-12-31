<template>
    <aside>
        <h3>Sign in Anonymously</h3>
        <button type="submit" class="btn btn-primary" @click="auth.signInAnonymously()">
            Sign In
        </button>
    </aside>
</template>

<script>
    import { auth } from '../firebase';

    export default {
        data() {
            return {
                auth,
            };
        }
    }
</script>