import {reducer, initializer} from '../socketReducer';
import {useReducer, useRef} from 'react';

const useMagnitude = (cityName) => {
  const wsRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, null, initializer);

  const closeConnections = () => {
    wsRef.current.close();
    dispatch({type: 'close'});
  };

  const initiateConnections = () => {
    dispatch({type: 'connecting'});
    const ws = new WebSocket('wss://forecast-ut-88jlk.ondigitalocean.app/magnitude/' + cityName);
    ws.onopen = () => dispatch({type: 'connected'});
    ws.onmessage = (message) => {
      dispatch({
        type: 'received-message',
        payload: JSON.parse(message.data).magnitude,
      });
    };
    wsRef.current = ws;
  };
  return {
    ...state,
    magnitude: state.message,
    initiateConnections,
    closeConnections,
  };
};

export default useMagnitude;
