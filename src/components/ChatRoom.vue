<template>
    <div>
        <h3>Chat Room {{ chatId }}</h3>

    </div>
</template>

<script>
    export default {
        computed: {
            chatId() {
                return this.$route.params.id;
            }
        }
    }
</script>

<style>

</style>