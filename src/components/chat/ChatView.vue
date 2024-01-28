<template>
  <div class="container-fluid window">
    {{ connectionStore.isConnected }}
    <div class="row m-1">
      <div class="col-4 room-window" style="padding: 0">
        <RoomList />
      </div>
      <MessagesList  v-if="roomStore.currentRoom"  />
      <div class="col-8 no-message" v-else style="padding: 0">
        <p class="chat-placeholder" >Выберите комнату чтобы увидеть сообщения</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoomStore } from "@/stores/roomStore";
import { useConnectionStore } from "@/stores/connection";
import MessagesList from "./MessagesList.vue"
import RoomList from "../room/RoomsList.vue";
const roomStore = useRoomStore()
const connectionStore = useConnectionStore()
connectionStore.connect()
connectionStore.bindEvents()

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