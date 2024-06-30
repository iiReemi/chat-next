// src/socket.js

import { io } from "socket.io-client";

const socketUrl =
  process.env.NEXT_PUBLIC_SOCKET_IO_URL || "http://localhost:4000"; // URL padrão caso a variável de ambiente não esteja definida
const socket = io(socketUrl);

export default socket;
