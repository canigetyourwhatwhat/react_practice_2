const ACTIONS = {
  ADD_WEATHER: 'add-weather',
  REMOVE_WEATHER: 'remove-weather',
  REMOVE_HISTORY: 'remove-history',
};

export const initializer = () => ({
  weather: [],
  history: [],
});

export const createWeather = (cityName) => ({
  type: ACTIONS.ADD_WEATHER,
  payload: cityName,
});

export const removeWeather = (id) => ({
  type: ACTIONS.REMOVE_WEATHER,
  payload: id,
});

export const removeHistory = () => ({
  type: ACTIONS.REMOVE_HISTORY,
});

export const create = (state, cityName) => {
  return {
    weather: [...state.weather, {id: Date.now(), cityName}],
    history: [cityName, ...state.history].slice(0, 3),
  };
};

export const removeW = (state, id) => {
  return {
    weather: state.weather.filter((weather) => id != weather.id),
    history: state.history,
  };
};

export const removeH = (state) => {
  return {
    weather: state.weather,
    history: [],
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_WEATHER:
      return create(state, action.payload);
    case ACTIONS.REMOVE_WEATHER:
      return removeW(state, action.payload);
    case ACTIONS.REMOVE_HISTORY:
      return removeH(state);
    default:
      return state;
  }
};
