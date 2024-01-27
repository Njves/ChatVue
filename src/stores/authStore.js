import { defineStore } from "pinia";

const URL = 'http://127.0.0.1:5000/'

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: '',
    error: '',
    loader: false
  }),

  actions: {
    async auth(endpoint, data) {
      this.loader = true
      const res = await fetch(URL + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(data)
      })
      this.loader = false

      if (!res.ok) {
        this.error = await res.json().error
        return
      }
      this.user = await res.json()
      console.log(this.user)


    },
    getters: {
      isAuth() {
        return this.user !== ''
      }
  },
  }
});