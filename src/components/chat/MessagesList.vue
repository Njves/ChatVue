<template>
  <div class="col-8 chat-window" style="padding: 0">
  <UploadFile />
    <div class="container chat-message" @scroll="onScroll" ref="messageList">
      <p class="text-center" v-if="roomStore.isEmpty">В комнате нет сообщений</p>
      <div class="messages">
        <MessageComponent v-for="message in roomStore.messages" :key="message.id" :message="message" :isSender="message.user.username === 'admin'" />
      </div>
      <div class="d-flex justify-content-center" v-if="roomStore.loader">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="control">
        <ControlPanel />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from "vue"
import { useRoomStore } from "@/stores/roomStore";
import MessageComponent from "./MessageComponent.vue";
import ControlPanel from "./input/ControlPanel.vue";
import UploadFile from "./input/UploadFile.vue";
const roomStore = useRoomStore()

const messageList = ref(null)
const files = ref(null)
watch(() => roomStore.messages, (oldMessage, newMessages) => {
  scrollBottom()
}, {'flush': 'post'})

const scrollBottom = () => {
  messageList.value.scrollTop = messageList.value.scrollHeight
}

const onScroll = () => {
  if(messageList.value.scrollTop <= 5) {
    console.log('Подгрузить сообщения')
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
.chat-message {
  height: 90vh;
  position: relative;
  overflow-y: auto;
  margin-bottom: 15px;
}

</style>