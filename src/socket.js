import { io } from "socket.io-client";


// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:5000?user_id=1';

export const socket = io(URL, {

});
