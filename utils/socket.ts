import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SERVICE_URL || "http://ec2-54-87-52-188.compute-1.amazonaws.com:8000/";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
});
