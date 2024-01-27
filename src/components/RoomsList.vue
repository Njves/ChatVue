<template>
    <div class="container m-0">
       <Room @onRoomClick="roomStore.currentRoom = room.id" v-for="room in roomStore.roomList" :key="room.id" :room="room" />
    </div>
</template>
<script setup>
import { reactive } from 'vue'
import { useRoomStore } from "../stores/roomStore";
import Room from "./RoomComponent.vue"
const roomStore = useRoomStore()
roomStore.getRooms()
</script>
<style>
.container {
    background-color: rgb(0, 0, 0, 0.1);
}
</style>