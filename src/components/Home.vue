<template>
    <div class="container">
        <User v-slot:user="{ user }">
            <div v-if="user">
                <UserProfile
                    :uid="user.uid"
                    :display-name="user.displayName"
                    :creation-time="user.metadata.creationTime"
                />

                <hr>

                <ChatList :uid="user.uid" />
            </div>
            <Login v-else />
        </User>
    </div>
</template>

<script>
    import User from './User';
    import UserProfile from './UserProfile';
    import Login from "./Login";
    import ChatList from "./ChatList";

    export default {
        components: {
            User,
            UserProfile,
            Login,
            ChatList,
        }
    }
</script>