import { io } from "socket.io-client";
import { BASE_URL } from "./constant";
import Cookies from "js-cookie";

export const initializeSocketConnection = () => {
    const token = Cookies.get('token');

    if (location.hostname === 'localhost') {
        return io(BASE_URL, {
            auth: {
                token: token
            }
        });
    } else {
        return io('/', {
            path: '/api/socket.io',
            auth: {
                token: token,
            },
            
        });
    }

     
}