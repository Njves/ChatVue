<template>
  <div class="container-fluid">
    <div class="row m-1">
      <div class="col-4" style="padding: 0">
        <RoomList />
      </div>
      <div class="col-8" style="padding: 0">
          <MessagesList/>
      </div>

    </div>
  </div>
</template>
  
<script setup>
import { useRoomStore } from "../stores/roomStore";
import { useAuthStore } from "../stores/authStore";
import MessagesList from "./MessagesList.vue"
import RoomList from "./RoomsList.vue";
const roomStore = useRoomStore()
const authStore = useAuthStore()



roomStore.getMessages()

</script>
<style>
</style>