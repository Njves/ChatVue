import { defineStore } from "pinia";
import { socket } from "@/socket";
import { useRoomStore } from "./roomStore";

export const useMessageStore = defineStore("messageStore", {
    state: () => ({
        room: useRoomStore(),
    }),
    actions: {
        sendMessage(message) {
            message.room_id = this.room.currentRoom.id
            socket.emit('new_message', message)
        },
        subscribe() {
            socket.on('join', (data) => {
                console.log(data)
            }),
            socket.on('notify', (data) => {
                console.log(data)
            }),
            socket.on('chat', (data) => {
                console.log(data)
                this.room.messages.push(data)
            })
        }
    }



    


});