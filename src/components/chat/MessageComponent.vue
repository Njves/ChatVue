<template>
    <div class="clearfix" v-if="!isSender" >
        <div class="message m-1" >
            <div class="row">
                <div class="col">
                    <span>{{ message.user.username }} {{ formatDate(message.date) }}</span>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <span>{{ message.text }}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="clearfix" @click="isSelected = !isSelected" :class="{selected: isSelected}" v-else>
        <div class="message-owner m-1">
            <div class="row">
                <div class="col">
                    <span>{{ message.user.username }} {{ formatDate(message.date) }}</span>
                </div>
            </div>
            <div class="row">
                <div class="container d-flex justify-content-between">
                    <div class="attachment-wrapper" v-for="attach in message.attachments" :key="attach.id">
                        <img class="attachments" :src="url + attach.link" width="200" height="340" alt="attach.type"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <span>{{ message.text }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import moment from 'moment';
import { useMessageStore } from "@/stores/messageStore";
const messageStore = useMessageStore()
const url = process.env.VUE_APP_URL
const props = defineProps({
    message: {
        type: Object,
        required: true,
        default: () => { },
    },
    isSender: {
        type: Boolean,
        required: false,
        default: false
    },
});

const formatDate = (value) => {
    if (value)
        return moment(String(value)).format('hh:mm')
}
let isSelected = ref(false)
</script>
<style>
.attachments {
    object-fit: cover;
}
.attachment-wrapper {
    max-width: 100%;
    height: auto;
}
.message-owner {
    background-color: rgb(102, 102, 102, 0.2);
    padding: 8px;
    border-radius: 20px;
    width: fit-content;
    max-width: 70%;
    margin: 4px;
    word-break: break-all;
    float: right;
}
.message {
    background-color: rgb(102, 102, 102, 0.2);
    padding: 8px;
    border-radius: 20px;
    width: fit-content;
    max-width: 70%;
    margin: 4px;
    word-break: break-all;
    float: left;
}
.selected {
    background-color: rgba(0,0,0, 0.2);
}
</style>