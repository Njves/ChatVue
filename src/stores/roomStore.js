import { defineStore } from "pinia";

const URL = 'http://127.0.0.1:5000/'

const ROOMS = [
  {
    "id": 2,
    "last_message": {
      "attachments": [],
      "date": "2024-01-23 11:00:54.551103",
      "id": 78,
      "receiver": null,
      "room_id": 2,
      "text": "Ну если кнопку нажимать то пропадает, а если на клавиатуре кнопку, то нет",
      "user": {
        "color": "#000000",
        "email": null,
        "id": 5,
        "last_seen": "2024-01-23 11:00:06.773616",
        "username": "Egor1"
      }
    },
    "name": "Python",
    "owner_id": 1
  },
  {
    "id": 3,
    "last_message": {
      "attachments": [],
      "date": "2024-01-23 11:00:54.551103",
      "id": 78,
      "receiver": null,
      "room_id": 2,
      "text": "Ну если кнопку нажимать то пропадает, а если на клавиатуре кнопку, то нет",
      "user": {
        "color": "#000000",
        "email": null,
        "id": 5,
        "last_seen": "2024-01-23 11:00:06.773616",
        "username": "Egor1"
      }
    },
    "name": "Общая комната",
    "owner_id": null
  },
  {
    "id": 7,
    "last_message": {
      "attachments": [],
      "date": "2024-01-23 11:00:54.551103",
      "id": 78,
      "receiver": null,
      "room_id": 2,
      "text": "Ну если кнопку нажимать то пропадает, а если на клавиатуре кнопку, то нет",
      "user": {
        "color": "#000000",
        "email": null,
        "id": 5,
        "last_seen": "2024-01-23 11:00:06.773616",
        "username": "Egor1"
      }
    },
    "name": "1243",
    "owner_id": 1
  },
  {
    "id": 8,
    "last_message": {
      "attachments": [],
      "date": "2024-01-23 11:24:58.508370",
      "id": 156,
      "receiver": null,
      "room_id": 8,
      "text": "Только так сделать чтобы",
      "user": {
        "color": "#00000",
        "email": null,
        "id": 1,
        "last_seen": "2024-01-22 17:01:04.607670",
        "username": "admin"
      }
    },
    "name": "хихи",
    "owner_id": 6
  }
]

const roomsMessages = {
  "id": 2,
  "messages": [
    {
      "attachments": [],
      "date": "2024-01-23 11:00:54.551103",
      "id": 78,
      "receiver": null,
      "room_id": 2,
      "text": "Ну если кнопку нажимать то пропадает, а если на клавиатуре кнопку, то нет",
      "user": {
        "color": "#000000",
        "email": null,
        "id": 5,
        "last_seen": "2024-01-23 11:00:06.773616",
        "username": "Egor1"
      }
    },
    {
      "attachments": [],
      "date": "2024-01-23 11:00:28.092383",
      "id": 77,
      "receiver": null,
      "room_id": 2,
      "text": "Блять да",
      "user": {
        "color": "#000000",
        "email": null,
        "id": 5,
        "last_seen": "2024-01-23 11:00:06.773616",
        "username": "Egor1"
      }
    },
  ]
}


export const useRoomStore = defineStore("roomStore", {
    state: () => ({
        roomList: [],
        currentRoom: 2,
        messages: [],
        error: '',
        loader: false
    }),

    actions: {
        async getRooms() {
            // this.loader = true
            // const res = await fetch(URL + 'rooms', {
            //     mode: 'cors',
            //     credentials: 'same-origin'
            // })
            // this.loader = false
            // if (!res.ok) {
            //     this.error = await res.json().error
            // }
            // this.roomList = await res.json()
            this.roomList = ROOMS
        },
        async getMessages() {
            // this.loader = true
            // const res = await fetch(URL + 'room/' + 2, {
            //     mode: 'cors',
            //     credentials: 'same-origin'
            // })
            // this.loader = false
            // if (!res.ok) {
            //     this.error = await res.json().error
            // }
            // this.messages = await res.json()
            this.messages = roomsMessages
        }
    },
    getters: {
        isAuth() {
            return this.user !== ''
        }
    },
});