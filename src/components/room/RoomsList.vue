<template>
    <div class="container m-0">
        <div class="rooms" v-if="!roomStore.loaderRoom">
            <Room @onRoomClick="roomStore.currentRoom = room" v-for="room in roomStore.roomList" :key="room.id" :room="room" />
        </div>
        <div class="rooms d-flex justify-content-center" v-else>
            Комнаты загружаются
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>

</template>
<script setup>
import { useRoomStore } from "@/stores/roomStore";
import Room from "./RoomComponent.vue"
import {watch} from "vue";
import {router} from "@/router";
const roomStore = useRoomStore()
roomStore.getRooms()
roomStore.joinRoom()
roomStore.subscribeOnLocal()
roomStore.getMessages()

watch(() => roomStore.currentRoom, (oldRoom, newRoom) => {
    roomStore.joinRoom()
    roomStore.offset = 0
    roomStore.getMessages()
    router.push({name: 'room', params: {id: roomStore.currentRoom.id }})
}, {'deep': 'true'})


</script>
<style>
</style>