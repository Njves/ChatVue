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
      console.log(file)
      this.attachedFiles.push(file)
    }
  },
  getters: {
    countAttachedFiles() {
      return this.attachedFiles.length
    }
  },
});