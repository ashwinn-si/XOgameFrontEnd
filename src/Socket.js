import {io} from "socket.io-client";

const backendURL = `https://xogamebackend.onrender.com`;

const socket = io.connect(backendURL, {
    autoConnect: false,
});

export default socket;