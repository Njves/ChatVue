import { defineStore } from "pinia";
import {useRoomStore} from "@/stores/roomStore";
import {useAuthStore} from "@/stores/authStore";

const URL = process.env.VUE_APP_URL

export const useAttachmentStore = defineStore("attachmentsStore", {
    state: () => ({
        attachedFiles: [],
        errors: {},
        room: useRoomStore(),
        authStore: useAuthStore()
    }),

    actions: {
        async uploadFile(file) {
            let formData = new FormData()
            formData.append('room_id', this.room.currentRoom.id)
            formData.append('file', file)
            console.log(formData)
            const res = await fetch(URL + '/upload', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + this.authStore.token
                },
                mode: 'cors',
                credentials: 'same-origin',
                body: formData
            })
            if(!res.ok) {
                alert('Неудалось загрузить')
                return
            }
            const attachments = await res.json()
            for(const attachment of attachments) {
                this.attachedFiles.push(attachment)
            }

        },
        clearAttachments() {
            this.attachedFiles = []
        },
        removeAttachment(attachment) {
            const index = this.attachedFiles.indexOf(attachment)
            if(index !== -1)
                this.attachedFiles.splice(index, 1)
        }
    },
    getters: {
        countAttachedFiles() {
            return this.attachedFiles.length
        }
    },
});