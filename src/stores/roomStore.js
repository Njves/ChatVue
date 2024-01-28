import { defineStore } from "pinia";
import { socket } from '../socket'
const URL = 'http://127.0.0.1:5000/'


export const useRoomStore = defineStore("roomStore", {
  state: () => ({
    roomList: [],
    currentRoom: localStorage.getItem('currentRoom') ? JSON.parse(localStorage.getItem('currentRoom')) : {},
    messages: [],
    error: '',
    loader: false,
    loaderRoom: false,
    isEmpty: true
  }),

  actions: {
    subscribeOnLocal() {
      this.$subscribe((mutation, state) => {
        localStorage.setItem('currentRoom', JSON.stringify(this.currentRoom))
      })
    },
    async joinRoom() {
      socket.emit('join', this.currentRoom)
    },
    async getRooms() {
      this.loaderRoom = true
      const res = await fetch(URL + 'rooms', {
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
        const res = await fetch(URL + 'room/' + this.currentRoom.id, {
          mode: 'cors',
          credentials: 'same-origin'
        })

      this.loader = false
      if (!res.ok) {
        this.error = await res.json().error
        return
      }
      const roomJson = await res.json()
      const messages = roomJson.messages
      this.isEmpty = messages.length == 0;
      this.messages = []
      for(const message in messages) {
        this.messages.unshift(messages[message])
      }
      return this.messages
    }
  },
  getters: {
    isAuth() {
      return this.user !== ''
    }
  },
});