import { io } from "socket.io-client";



export const getSocket = (token) => {
    return io('', {
        autoConnect: true, query: {
            'token': token
        }
    });
}
