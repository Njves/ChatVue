<template>
    <div class="container-fluid window">
        <div class="row m-1">
            <div class="col-4 room-window" style="padding: 0">
                <RoomList />
            </div>
            <router-view > </router-view>
<!--            <MessagesList " :id="roomStore.messages"  v-if="roomStore.currentRoom"  />-->
<!--            <div class="col-8 no-message" v-else style="padding: 0">-->
<!--                <p class="chat-placeholder" >Выберите комнату чтобы увидеть сообщения</p>-->
<!--            </div>-->
        </div>
    </div>
    <ToastComponent :message="messageRef" />
</template>

<script setup>
import RoomList from "../room/RoomsList.vue";
import {useConnectionStore} from "@/stores/connection";
import { useRoomStore } from "@/stores/roomStore";
import {useAuthStore} from "@/stores/authStore";
import ToastComponent from "@/components/ToastComponent.vue";
import { Toast } from 'bootstrap'
import {ref} from "vue";

const authStore = useAuthStore()
const roomStore = useRoomStore()
const connectionStore = useConnectionStore()
const messageRef = ref(null)

authStore.getUser()
connectionStore.connect()
connectionStore.bindEvents()
const socket = connectionStore.socket
socket.on('notify', (message) => {
    navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('Новое сообщение в канале', {
            body: message.text,
        });
    });
})

</script>
<style>

.no-message {
    position: relative;
}
.room-window {
    border-radius: 12px;
}

.chat-placeholder {
    position: relative;
    width: fit-content;
    top: 50%;
    bottom: 50%;
    left: 30%;
    background-color: rgb(21, 19, 19, 0.2);
    padding: 4px;
    border-radius: 12px;
}
</style>