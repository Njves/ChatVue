<template>
    <div class="room" :class="{active: room.id === roomStore.currentRoom}" @click="$emit('onRoomClick', room)">
        <div class="row">
            <span class="room-name col-6">{{ room.name }}</span>
            <span class="col-6">{{ formatDate(room.last_message.date) }}</span>
        </div>
        <div class="row">
            <div class="col-10">
                <span class="room-last-message" v-if="room.last_message.text">{{ formatLastMessage(room.last_message.text) }}</span>
                <span class="room-last-message" v-else>Нет сообщений</span>
            </div>
            <div class="col-2">
                <span class="room-missed-message" style="height: 20px; width: 20px">8</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useRoomStore } from "../stores/roomStore";
import moment from 'moment';
const roomStore = useRoomStore()


const props = defineProps({
    room: {
        type: Object,
        required: true,
        default: () => { },
    }
});

const formatDate = (value) => {
    if (value)
        return moment(String(value)).format('hh:mm DD.MM')
}
const formatLastMessage = (value) => {
    if (value)
        if (value.length > 30)
            return value.slice(0, 30) + '...'
}
</script>
<style>
.room {
    background-color: rgb(130, 209, 115, 0.3);
    padding: 16px;
    color: rgb(0, 0, 0);
    margin: 4px;
    border-radius: 20px;
    cursor: pointer;
}

.room:hover {
    background-color: rgb(130, 209, 115, 0.5);
}

.room-name {
    padding-bottom: 8px;
    font-weight: bold;
}

.room-last-message {
    float: right;
}
.active {
    background-color: rgba(0, 255, 149, 0.9);
}
.room-missed-message {
    background-color: #D9D9D9;
    padding: 4px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
}
</style>