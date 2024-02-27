import { io } from "socket.io-client";



export const getSocket = (token) => {
    return io('https://5.35.88.60:5000/', {
        autoConnect: true, query: {
            'token': token
        }
    });
}
