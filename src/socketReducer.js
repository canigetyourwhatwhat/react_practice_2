const ACTIONS = {
  CONNECT: 'connect',
  CONNECTED: 'connected',
  RECEIVED_MESSAGE: 'received-message',
  CLOSE: 'close',
};

export const initializer = () => ({
  connected: false,
  connecting: false,
  message: null,
});

export const receivedMessage = (state, payload) => ({
  ...state,
  message: payload,
});

export const connect = () => {
  return {
    connected: false,
    connecting: true,
    message: null,
  };
};

export const close = () => {
  return {
    connected: false,
    connecting: false,
    message: null,
  };
};

export const connected = () => {
  return {
    connected: true,
    connecting: false,
    message: null,
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CONNECT:
      return connect();
    case ACTIONS.CLOSE:
      return close(state);
    case ACTIONS.CONNECTED:
      return connected();
    case ACTIONS.RECEIVED_MESSAGE:
      return receivedMessage(state, action.payload);
    default:
      return state;
  }
};
