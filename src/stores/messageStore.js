import {defineStore} from "pinia";
import {useRoomStore} from "./roomStore";
import {useAuthStore} from "@/stores/authStore";
import {useConnectionStore} from "@/stores/connection";
import {useAttachmentStore} from "@/stores/attachmentStore";

const URL = process.env.VUE_APP_URL
export const useMessageStore = defineStore("messageStore", {
    state: () => ({
        authStore: useAuthStore(),
        room: useRoomStore(),
        socketStore: useConnectionStore(),
        selectedMessages: [],
        attachedStore: useAttachmentStore()
    }),
    actions: {
        sendMessage(message) {
            message.room_id = this.room.currentRoom.id
            this.socketStore.socket.emit('new_message', message)
            this.room.updateLastMessage(message)
        },
        async removeMessages(messages) {
            const messagesToDelete = [...messages]
            for (let message of messagesToDelete) {
                const res = await fetch(URL + '/message/' + message.id, {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + this.authStore.token
                    },
                    credentials: 'same-origin'
                })
                console.log(res.ok)
                const index = this.room.messages.indexOf(message)
                const indexSecond = messages.indexOf(message)
                if(index !== -1) {
                    this.room.messages.splice(index, 1)
                    messages.splice(indexSecond, 1)
                }
            }
        },
            // const res = await fetch(URL = "/message/" + message.id) {
            //     method: 'PUT',
            //         headers: {
            //             Authorization: 'Bearer ' + this.authStore.token
            //         },
            //         credentials: 'same-origin'
            //         body: message
            //     }
            // }
            // if(!res.ok)
            //     return

        async search(query) {
            const res = await fetch(URL + '/messages/' + 'search?query=' + query + '&room_id=' + this.room.currentRoom.id, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.authStore.token
                },
                credentials: 'same-origin'
            })
            if(!res.ok)
                return
            this.room.messages = await res.json()
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