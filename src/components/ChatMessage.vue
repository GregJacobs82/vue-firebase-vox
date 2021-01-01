<template>
    <div class="row" :class="{ 'flex-row-reverse text-end':isOwner }">
        <div class="col-11 col-md-9 rounded p-2 pt-0 mb-3" :class="isOwner ? 'alert-info' : 'alert-secondary'">
            <div><span style="font-size:.65em;opacity:.5;">{{ convertedTime(time) }}</span></div>
            <div><span style="font-size:.65em;opacity:.5;">{{ sender }}</span></div>
            <div>{{ text }}</div>
            <div v-if="audioUrl" class="mt-1">
                <audio :src="audioUrl" controls />
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

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
            time: {
                type: [String, Number],
                required: true,
            },
            audioUrl: {
                type: String,
                default: null,
            },
            isOwner: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            convertedTime(t) {
                return moment(t).format('YYYY-MM-DD h:mma');
            }
        }
    }
</script>

<style>

</style>