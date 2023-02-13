import store from '../slices/index.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const createAPI = (socket) => {
  const addNewMessage = (message, callback) => {
    socket.emit('newMessage', message, (response) => {
      if (callback) callback(response);
    });
  };

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });

  const addNewChannel = (channel, callback) => {
    socket.emit('newChannel', channel, (response) => {
      if (callback) callback(response);
    });
  };

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });

  const removeChannel = (id, callback) => {
    socket.emit('removeChannel', { id }, (response) => {
      if (callback) callback(response);
    });
  };

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsActions.removeChannel(payload));
  });

  const renameChannel = (renamedChannel, callback) => {
    socket.emit('renameChannel', renamedChannel, (response) => {
      if (callback) callback(response);
    });
  };

  socket.on('renameChannel', (payload) => {
    const { name, id } = payload;
    store.dispatch(channelsActions.changeChannelName({
      id,
      changes: {
        name,
      },
    }));
  });

  return {
    addNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};

export default createAPI;
