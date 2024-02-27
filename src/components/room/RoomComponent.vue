<template>

    <div class="room" :class="{active: room.id === roomStore.currentRoom.id}" @click="$emit('onRoomClick', room)">
        <div class="row">
            <span class="room-name col-auto">{{ room.name }}</span>
            <span class="col-auto room-last-message-date">{{ formatDate(room.last_message.date) }}</span>
        </div>
        <div class="row">
            <div class="col-6" style="word-break: break-all">
                <span class="room-last-message" v-if="room.last_message.text">{{ formatLastMessage(room.last_message.text) }}</span>
                <span class="room-last-message" v-else>Нет сообщений</span>
            </div>
            <div class="col-4">
                <span class="room-missed-message" style="height: 20px; width: 20px">8</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import {defineProps, onMounted, ref} from 'vue';
import { useRoomStore } from "@/stores/roomStore";
import moment from 'moment';
const roomStore = useRoomStore()
const props = defineProps({
    room: {
        type: Object,
        required: true,
        default: () => { },
    }
});
onMounted(() => {
})


const formatDate = (value) => {
    if (value)
        return moment(String(value)).format('hh:mm DD.MM')
}
const formatLastMessage = (value) => {
    if (value)
        if (value.length > 30)
            return value.slice(0, 30) + '...'
    return value
}
</script>
<style>
.room {
    background-color: rgb(130, 209, 115, 0.5);
    padding: 16px;
    color: rgb(0, 0, 0);
    margin: 8px 4px 4px 4px;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: -2px 3px 3px 0 rgba(0, 0, 0, 0.5);
}

.room-last-message {
    color: rgba(0, 0, 0, 0.7);
    margin-left: 8px;
}

.room:hover {
    background-color: rgb(130, 209, 115, 0.5);
}

.room-name {
    padding-bottom: 8px;

}

.room-last-message-date {
    font-size: 13px;
}
.active {
    background-color: rgba(102, 126, 116, 0.62);
    pointer-events: none;
}
.room-missed-message {
    background-color: #D9D9D9;
    padding: 4px;
    border-radius: 8px;
    width: 20px;
    height: 20px;

}
</style>