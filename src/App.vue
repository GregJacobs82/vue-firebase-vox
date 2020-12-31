<template>
    <div id="app">
        <header class="container bg-light">
            <h1>Vue Voxer</h1>
            <p>Realtime Voice Chat</p>
        </header>

        <router-view />
    </div>
</template>

<script>
    import { auth } from './firebase';

    console.log(auth);

    export default {
        components: {

        }
    }
</script>

<style>

</style>
