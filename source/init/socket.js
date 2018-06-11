import io from 'socket.io-client';

import { ROOT_URL, groupID } from "../config";

export const socket = io(ROOT_URL, {
    path: '/redux/ws',
});

export const joinSocketChannel = () => {
    socket.emit('join', groupID);
};
