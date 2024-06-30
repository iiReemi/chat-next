// src/socket.js

import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // substitua pela URL do seu servidor

export default socket;
