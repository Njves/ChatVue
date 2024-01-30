import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/authStore";
import {useConnectionStore} from "@/stores/connection";


const URL = process.env.VUE_APP_URL


export const useRoomStore = defineStore("roomStore", {
    state: () => ({
        auth: useAuthStore(),
        roomList: [],
        currentRoom: localStorage.getItem('currentRoom') ? JSON.parse(localStorage.getItem('currentRoom')) : {},
        messages: [],
        error: '',
        loader: false,
        loaderRoom: false,
        isEmpty: true,
        socketStore: useConnectionStore(),
        offset: 0,
        count: 20
    }),

    actions: {
        subscribeOnLocal() {
            this.$subscribe((mutation, state) => {
                localStorage.setItem('currentRoom', JSON.stringify(this.currentRoom))
            })
        },
        async joinRoom() {
            this.socketStore.socket.emit('join', this.currentRoom)
        },
        async getRooms() {
            await this.auth.getUser()
            this.loaderRoom = true
            const res = await fetch(URL + '/rooms', {
                mode: 'cors',
                credentials: 'same-origin'
            })
            this.loaderRoom = false
            if (!res.ok) {
                this.error = await res.json().error
            }
            this.roomList = await res.json()
        },
        async getMessages() {
            this.loader = true
            if(!this.currentRoom)
                return
            const res = await fetch(URL + '/room/' + this.currentRoom.id + '?count=' + this.count + '&offset=' + this.offset, {
                mode: 'cors',
                credentials: 'same-origin'
            })


            if (!res.ok) {
                this.error = await res.json().error
                return
            }
            const roomJson = await res.json()
            const messages = roomJson.messages
            if(this.offset === 0) {
                this.messages = []
            }
            this.isEmpty = messages.length == 0;

            for(const message in messages) {
                this.messages.unshift(messages[message])
            }
            this.loader = false
            return this.messages
        },
        updateLastMessage(message) {
            for(const room of this.roomList) {
                if(room.id === message.room_id) {
                    room.last_message = message
                }
            }
        }

    },
    getters: {
        isAuth() {
            return this.user !== ''
        }
    },
});