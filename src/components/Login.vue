<template>
    <aside>
        <h3>Sign in Anonymously</h3>
        <button class="btn btn-primary" @click="auth.signInAnonymously()">
            Sign In
        </button>

        <hr>

        <div v-if="newUser" class="mb-3">
            <h3>Sign Up for a New Account</h3>
            <a href="#" @click="newUser = !newUser">
                Returning User?
            </a>
        </div>

        <div v-else class="mb-3">
            <h3>Sign In with Email</h3>
            <a href="#" @click="newUser = !newUser">
                New User?
            </a>
        </div>

        <div>
            <div class="mb-3">
                <label for="inputEmail1" class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" id="inputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="inputPassword1" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="inputPassword1">
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="check1">
                <label class="form-check-label" for="check1">
                    <small>I agree to your Terms of Use &amp; Privacy Policy</small>
                </label>
            </div>

            <button v-if="loading" class="btn btn-primary disabled" @click="signInOrCreateUser()" disabled>
                <div class="spinner-grow spinner-grow-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                Loading...
            </button>
            <button v-else class="btn btn-primary" @click="signInOrCreateUser()">
                {{ newUser ? 'Sign Up' : 'Sign In' }}
            </button>
        </div>
    </aside>
</template>

<script>
    import { auth } from '../firebase';

    export default {
        data() {
            return {
                auth,

                newUser: false,
                email: '',
                password: '',
                loading: false,
            };
        },
        methods: {
            async signInOrCreateUser() {
                this.loading = true;

                if (this.newUser) {
                    await auth.createUserWithEmailAndPassword(this.email, this.password);
                } else {
                    await auth.signInWithEmailAndPassword(this.email, this.password);
                }

                this.loading = false;
            }
        }
    }
</script>