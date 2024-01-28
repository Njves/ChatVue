import { io } from "socket.io-client";


const URL = 'http://localhost:5000?token=';

export const getSocket = (token) => {
    return io(URL + token, {
        autoConnect: true
    });
}
