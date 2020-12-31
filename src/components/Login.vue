<template>
    <aside>
        <h3>Sign in Anonymously</h3>
        <button class="btn btn-primary" @click="auth.signInAnonymously()">
            Sign In
        </button>

        <hr>

        <div class="col-lg-6 rounded shadow p-3 p-lg-5 mx-auto mb-5" :class="newUser ? 'alert-success' : 'alert-info'">
            <div v-if="newUser" class="text-center mb-3">
                <h3>Create a New Account</h3>
                <a href="#" @click="newUser = !newUser">
                    Returning User?
                </a>
            </div>

            <div v-else class="text-center mb-3">
                <h3>Sign In with Email</h3>
                <a href="#" @click="newUser = !newUser">
                    New User?
                </a>
            </div>

            <div>
                <!-- FORM -->
                <div class="mb-3">
                    <label for="inputEmail1" class="form-label">Email</label>
                    <input v-model="email" type="email" class="form-control" id="inputEmail1" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="inputPassword1" class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control" id="inputPassword1">
                </div>

                <!-- ERRORS -->
                <div v-if="errorMessage" class="alert alert-danger mt-3">
                    {{ errorMessage }}
                </div>

                <!-- SUBMIT ACTION -->
                <button v-if="loading" class="btn btn-primary disabled" @click="signInOrCreateUser()" disabled>
                    <div class="spinner-grow spinner-grow-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Loading...
                </button>
                <button v-else class="btn btn-lg text-white w-100" @click="signInOrCreateUser()" :class="newUser ? 'btn-success' : 'btn-info'">
                    {{ newUser ? 'Create Account' : 'Sign In' }}
                </button>
            </div>
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
                errorMessage: '',
            };
        },
        methods: {
            async signInOrCreateUser() {
                this.loading = true;

                this.errorMessage = '';
                try {
                    if (this.newUser) {
                        await auth.createUserWithEmailAndPassword(this.email, this.password);
                    } else {
                        await auth.signInWithEmailAndPassword(this.email, this.password);
                    }
                } catch (error) {
                    this.errorMessage = error.message;
                }

                this.loading = false;
            }
        }
    }
</script>