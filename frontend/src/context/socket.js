// https://dev.to/bravemaster619/how-to-prevent-multiple-socket-connections-and-events-in-react-531d
import React from 'react';
import io from 'socket.io-client';

const { REACT_APP_BACKEND_URL } = process.env;
// const socket = io.connect(REACT_APP_BACKEND_URL);
export const socket = io(REACT_APP_BACKEND_URL);
const SocketContext = React.createContext(socket);

export default SocketContext;
