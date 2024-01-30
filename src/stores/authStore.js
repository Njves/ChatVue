import { defineStore } from "pinia";
import {router} from "@/router";

const URL = process.env.VUE_APP_URL

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
                const json = await res.json()
                this.error = json.error
                return
            }
            const response = await res.json()
            this.token = response.token
            this.user = response.user
            localStorage.setItem('token', this.token)
            await router.push('chat')
        },
        async getUser() {
            if(!this.token)
                return
            const res = await fetch(URL + "/user?token=" + this.token, {
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
            await router.push('chat')
        },
        getters: {
            isAuth() {
                return this.user !== ''
            }
        },
    }
});