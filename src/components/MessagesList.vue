<template>
    <div class="container chat-message">
        <div class="messages">
            <MessageComponent v-for="message in roomStore.messages.messages" :key="message.id" :message="message" />
        </div>
        <div class="control">
            <ControlPanel/>
        </div>
    </div>
</template>
    
<script setup>
import { useRoomStore } from "../stores/roomStore";
import { useAuthStore } from "../stores/authStore";
import MessageComponent from "./MessageComponent.vue";
import ControlPanel from "./ControlPanel.vue";
const roomStore = useRoomStore()
const authStore = useAuthStore()

roomStore.getMessages()

</script>
<style>
.chat-message {
    height: 95vh;
    position: relative;
    overflow-y: auto;
}
</style>