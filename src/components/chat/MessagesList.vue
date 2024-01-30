<template>
    <div class="col-8 chat-window" style="padding: 0">
        <MessageMenu :showRemove="showRemove" :messages="selectedMessages.selected" />
        <UploadFile />
        <div class="container chat-message" @scroll="onScroll" ref="messageList">
            <p class="text-center" v-if="roomStore.messages.length == 0">В комнате нет сообщений</p>
            <div class="messages" >
                <MessageComponent @click="addToSelect(message)" v-for="message in roomStore.messages" :key="message.id" :message="message" :isSender="message.user.id === authStore.user.id" />
            </div>
            <div class="d-flex justify-content-center" v-if="roomStore.loader">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div class="control">
                <ControlPanel @onMessageSend="scrollBottom" />
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, watch, defineProps, defineEmits, reactive, onMounted, onUpdated} from "vue"
import { useRoomStore } from "@/stores/roomStore";
import MessageComponent from "./MessageComponent.vue";
import ControlPanel from "./input/ControlPanel.vue";
import UploadFile from "./input/UploadFile.vue";
import {useAuthStore} from "@/stores/authStore";
import {useConnectionStore} from "@/stores/connection";
import MessageMenu from "@/components/chat/MessageMenu.vue";

const roomStore = useRoomStore()
const authStore = useAuthStore()
const connectionStore = useConnectionStore()

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});
const showRemove = ref(false)
const selectedMessages = reactive({selected: []})
const emit = defineEmits(['getMessages'])
const messageList = ref(null)

watch(selectedMessages.selected,  (newSelected, oldSelected) => {
    showRemove.value = newSelected.length > 0
})

const addToSelect = (message) => {
    const index = selectedMessages.selected.indexOf(message)
    if(index !== -1) {
        selectedMessages.selected.splice(index, 1)
        return
    }
    if(message.user.id === authStore.user.id) {
        selectedMessages.selected.push(message)
    }

}
connectionStore.socket.on('chat', (data) => {
    scrollBottom()
})

watch(() => roomStore.messages, (oldMessage, newMessages) => {
}, {flush: 'post'})

watch(() => roomStore.messages, (oldMessage, newMessages) => {
    scrollBottom()
}, {flush: 'post'})
const scrollBottom = () => {
    if (messageList.value && messageList.value.scrollTop !== null && messageList.value.scrollHeight !== null) {
        messageList.value.scrollTop = messageList.value.scrollHeight;
    }
}

const onScroll = () => {
    if(messageList.value.scrollTop <= 0 && roomStore.messages) {
        roomStore.offset += roomStore.count
        roomStore.getMessages()
    }
}

</script>
<style>

.chat-window {
    position: relative;
    box-shadow: 0 -3px 7px 2px rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    padding-top: 12px;
}
* {
    overflow-anchor: none !important;
    scroll-snap-stop: normal !important;
    overscroll-behavior: unset !important;
    scroll-behavior: unset !important;
}
.chat-message {
    height: 90vh;
    position: relative;
    overflow-y: auto;
    margin-bottom: 15px;

}

</style>