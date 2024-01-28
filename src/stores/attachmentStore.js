import { defineStore } from "pinia";

const URL = 'http://127.0.0.1/upload'

export const useAttachmentStore = defineStore("attachmentsStore", {
    state: () => ({
        attachedFiles: [],
        errors: {}
    }),

    actions: {
        async uploadFile(file) {
            // const res = await fetch(URL, {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'multipart/form-data'
            //   },
            //   mode: 'cors',
            //   body: file
            // })
            // const json = await res.json()
            // if(!res.ok) {
            //   this.errors[file] = json.error
            //   return
            // }
            this.attachedFiles.push(file)
        },
        clearAttachments() {
            this.attachedFiles.clear()
        },
        removeAttachment(file) {
            const index = this.attachedFiles(file)
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