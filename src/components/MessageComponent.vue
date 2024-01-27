<template>
    <div class="message m-1">
        <div class="row">
            <div class="col-6">
                <span>{{ message.user.username }}</span>
            </div>
            <div class="col-4">
                <span>{{ formatDate(message.date) }}</span>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <span>{{ message.text }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import moment from 'moment';

const props = defineProps({
    message: {
        type: Object,
        required: true,
        default: () => { },
    }
});

const formatDate = (value) => {
    if (value)
        return moment(String(value)).format('hh:mm DD.MM')
}

</script>
<style>
.message {
    background-color: rgb(102, 102, 102, 0.2);
    padding: 8px;
    border-radius: 20px;
    margin: 4px;
}
</style>