import { defineStore } from "pinia";

const URL = 'http://127.0.0.1:5000/'

export const useAuthStore = defineStore("authStore", {
    state: () => ({
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
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
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(data)
            })
            this.loader = false

            if (!res.ok) {
                this.error = await res.json().error
                return
            }
            const response = await res.json()
            this.token = response.token
            this.user = response.user
            localStorage.setItem('token', this.token)
        },
        async getUser() {
            const res = await fetch(URL + "user?token=" + localStorage.getItem('token'), {
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors'
            })
            if(!res.ok) {
                return
            }
            this.user = await res.json()
        },
        getters: {
            isAuth() {
                return this.user !== ''
            }
        },
    }
});