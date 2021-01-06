<template>
    <aside>
        <div class="col-lg-6 rounded shadow p-3 p-lg-5 mx-auto mb-5" :class="newUser ? 'alert-success' : 'alert-info'">
            <div v-if="newUser" class="text-center mb-3">
                <h3>Create a New Account</h3>
            </div>
            <div v-else class="text-center mb-3">
                <h3>Sign In with Email</h3>
            </div>

            <div>
                <!-- FORM -->
                <div v-if="newUser" class="mb-3">
                    <!-- user.updateProfile({ displayName: payload.displayName }) -->
                    <label for="inputDisplayName" class="form-label">Name</label>
                    <input v-model="displayName" type="email" class="form-control" id="inputDisplayName" aria-describedby="displayNameHelp">
                    <div id="displayNameHelp" class="form-text" style="font-size:.85em;opacity:.5;">
                        Enter your desired username or display name.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="inputEmail1" class="form-label">Email</label>
                    <input v-model="email" type="email" class="form-control" id="inputEmail1" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text" style="font-size:.85em;opacity:.5;">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div class="mb-3">
                    <label for="inputPassword1" class="form-label">Password</label>
                    <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        id="inputPassword1"
                        @keypress.enter="signInOrCreateUser()"
                    >
                </div>

                <!-- ERRORS -->
                <div v-if="errorMessage" class="alert alert-danger mt-3">
                    {{ errorMessage }}
                </div>

                <!-- SUBMIT ACTION -->
                <button v-if="loading" class="btn btn-lg btn-primary w-100 disabled" disabled>
                    <div class="spinner-grow spinner-grow-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Loading...
                </button>
                <button v-else class="btn btn-lg text-white w-100" @click="signInOrCreateUser()" :class="newUser ? 'btn-success' : 'btn-info'">
                    {{ newUser ? 'Create Account' : 'Sign In' }}
                </button>

                <div class="mt-2 text-center">
                    <button
                        v-if="newUser"
                        class="btn btn-link text-decoration-none"
                        @click="newUser = !newUser"
                        style="font-size:.85em;"
                    >
                        Already have an account? Sign in
                    </button>
                    <button
                        v-else
                        class="btn btn-link text-decoration-none"
                        @click="newUser = !newUser"
                        style="font-size:.85em;"
                    >
                        New User? Create an account
                    </button>
                </div>
            </div>

            <hr class="my-4">

            <div class="text-center mb-3">
                <h5>Sign in as a Guest</h5>
                <button class="btn btn-sm btn-secondary" @click="auth.signInAnonymously()">
                    Guest User
                </button>
            </div>
        </div>
    </aside>
</template>

<script>
    import { auth, db } from '../firebase';

    export default {
        data() {
            return {
                auth,
                newUser: false,
                displayName: '',
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
                        await auth.createUserWithEmailAndPassword(this.email, this.password)
                        await db.collection("users").add({
                            email: this.email,
                            user_id: auth.currentUser.uid,
                            displayName: this.displayName,
                        })
                            .then( (docRef) => {
                                console.log("Document written with ID: ", docRef.id);
                            })
                            .catch( (error) => {
                                console.error("Error adding document: ", error);
                            });
                    } else {
                        await auth.signInWithEmailAndPassword(this.email, this.password);
                    }
                } catch (error) {
                    this.errorMessage = error.message;
                    console.error("Error adding document: ", error);
                }

                this.loading = false;
            }
        }
    }
</script>