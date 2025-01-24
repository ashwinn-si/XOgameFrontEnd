import {io} from "socket.io-client";

const backendURL = `http://localhost:5000`;

const socket = io.connect(backendURL, {
    autoConnect: false,
});

export default socket;