import { io } from "socket.io-client";


const URL = process.env.VUE_APP_URL + '?token=';

export const getSocket = (token) => {
    return io(URL + token, {
        autoConnect: true
    });
}
