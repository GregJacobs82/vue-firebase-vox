<template>
    <div id="app" class="d-flex flex-column h-100">
        <AppHeader />
        <main class="flex-shrink-0 pt-5 mt-5">
            <router-view />
        </main>
        <AppFooter />
    </div>
</template>

<script>
    import AppHeader from "./components/AppHeader";
    import AppFooter from "./components/AppFooter";

    export default {
        components: {
            AppHeader,
            AppFooter,
        }
    }
</script>

<style>

</style>
