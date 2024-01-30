<template>
    <div class="container-fluid window">
        <div class="d-flex flex-column" style="font-size: 10px">
            {{ connectionStore.isConnected }}<br/>
            {{ authStore.token }}<br/>
            {{ authStore.user }}<br/>
            {{ roomStore.currentRoom }}<br/>
            {{ roomStore.offset }}<br/>
        </div>
        <div class="row m-1">
            <div class="col-4 room-window" style="padding: 0">
                <RoomList />
            </div>
            <MessagesList @getMessages="onGetMoreMessages()" :messages="roomStore.messages"  v-if="roomStore.currentRoom"  />
            <div class="col-8 no-message" v-else style="padding: 0">
                <p class="chat-placeholder" >Выберите комнату чтобы увидеть сообщения</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import MessagesList from "./MessagesList.vue"
import RoomList from "../room/RoomsList.vue";
import {useConnectionStore} from "@/stores/connection";
import { useRoomStore } from "@/stores/roomStore";
import {useAuthStore} from "@/stores/authStore";

const authStore = useAuthStore()
const roomStore = useRoomStore()
const connectionStore = useConnectionStore()

authStore.getUser()
connectionStore.connect()
connectionStore.bindEvents()


const onGetMoreMessages = () => {
    roomStore.offset += roomStore.count
    roomStore.getMessages()
}
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