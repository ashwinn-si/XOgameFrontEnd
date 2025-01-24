import { createContext, useContext, useEffect } from "react";
import socket from "./Socket";

export const SocketContext = createContext();

function SocketProvider({ children }) {
    useEffect(() => {
        // Connect to the socket
        socket.connect();

        // Log socket connection events
        socket.on("connect", () => {
            console.log(`Socket connected with ID: ${socket.id}`);
        });


        return () => {
            socket.disconnect();
            console.log("Socket disconnected");
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;
