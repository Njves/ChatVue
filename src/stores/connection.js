import { defineStore } from "pinia";
import { getSocket } from "@/socket";
import {useAuthStore} from "@/stores/authStore";

export const useConnectionStore = defineStore("connection", {
  state: () => ({
    authStore: useAuthStore(),
    isConnected: false,
    socket: null
  }),

  actions: {
    bindEvents() {
      this.socket.on("connect", () => {
        this.isConnected = true;
      });

      this.socket.on("disconnect", () => {
        this.isConnected = false;
      });
    },

    connect() {
      this.socket = getSocket(this.authStore.token)
      this.socket.connect();
    }
  },
});