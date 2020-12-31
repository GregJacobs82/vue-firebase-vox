<template>
    <div class="row" :class="{ 'flex-row-reverse text-end':isOwner }">
        <div class="col-9 col-md-6 col-lg-5 rounded p-2 pt-0 mb-3" :class="isOwner ? 'alert-info' : 'alert-secondary'">
            <div><span style="font-size:.65em;opacity:.5;">{{ sender }}</span></div>
            <div>{{ text }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            sender: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            isOwner: {
                type: Boolean,
                default: false,
            }
        }
    }
</script>

<style>

</style>