<template>
    <div class="container">
        <h1>Homepage</h1>

        <User v-slot:user="{ user }">
            <div v-if="user">
                User ID: {{ user.uid }}
                <div v-if="user.metadata" class="text-black-50">
                    <small>Created: {{ user.metadata.creationTime }}</small>
                </div>
            </div>
            <Login v-else />
        </User>
    </div>
</template>

<script>
    import User from './User';
    import Login from "./Login";

    export default {
        components: {
            User,
            Login,
        }
    }
</script>