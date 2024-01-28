import { defineStore } from "pinia";
import { useRoomStore } from "./roomStore";
import {useAuthStore} from "@/stores/authStore";
import {useConnectionStore} from "@/stores/connection";

const URL = 'http://localhost:5000/message/'

export const useMessageStore = defineStore("messageStore", {
    state: () => ({
        authStore: useAuthStore(),
        room: useRoomStore(),
        socketStore: useConnectionStore()
    }),
    actions: {
        sendMessage(message) {
            message.room_id = this.room.currentRoom.id
            this.socketStore.socket.emit('new_message', message)
        },
        async removeMessage(message) {
            const res = await fetch(URL + message.id, {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + this.authStore.token
                },
                credentials: 'same-origin'
            })
            if(!res.ok)
                // Ошибка
                return
            const index = this.room.messages.indexOf(message)
            if(index !== -1)
                this.room.messages.splice(index, 1)
        },
        subscribe() {
            this.socketStore.socket.on('join', (data) => {
                console.log(data)
            })
            this.socketStore.socket.on('chat', (data) => {
                console.log(data)
                this.room.messages.push(data)
            })
            this.socketStore.socket.on('delete', (data) => {
                this.removeMessage(data)
            })
        }
    }
});