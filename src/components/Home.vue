<template>
    <div class="container">
        <h1>Homepage</h1>

        <User v-slot:user="{ user }">
            <div v-if="user">
                <UserProfile :user="user" />
            </div>
            <Login v-else />
        </User>
    </div>
</template>

<script>
    import User from './User';
    import UserProfile from './UserProfile';
    import Login from "./Login";

    export default {
        components: {
            User,
            UserProfile,
            Login,
        }
    }
</script>