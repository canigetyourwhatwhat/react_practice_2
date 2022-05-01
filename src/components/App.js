const SERVER_ADDRESS = 'https://forecast-ut-88jlk.ondigitalocean.app';

import {useReducer, useState} from 'react';
import CityInput from './CityInput';
import Header from './Header';
import Weather from './Weather';
import {
  reducer,
  initializer,
  createWeather,
  removeWeather,
  removeHistory,
} from '../reducer.js';

const App = () => {
  const [displayInput, setDisplayInput] = useState(true);
  const [displayHistory, setDisplayHistory] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, null, initializer);

  const handleCreateCity = async (cityName) => {
    try {
      const url = SERVER_ADDRESS + '/forecast';
      setError('');
      setIsLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({city: cityName}),
      });
      const result = await response.json();
      if (result.success) {
        dispatch(createWeather(cityName));
        setDisplayInput(false);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCity = (id) => dispatch(removeWeather(id));

  const handleDeleteHistory = () => dispatch(removeHistory());

  const handleClick = () => {
    setDisplayInput(true);
  };

  const handleDisplayHistory = () => {
    setDisplayHistory(!displayHistory);
  };
  return (
    <>
      {!!error && <p> {error} </p>}
      <Header
        onClick={handleClick}
        onDisplayHistory={handleDisplayHistory}
        onDeleteHistory={handleDeleteHistory}
      />
      {displayInput && (
        <CityInput onCreateCity={handleCreateCity} disabled={isLoading} />
      )}
      {displayHistory &&
        state.history.map((city, index) => <span key={index}> {city} </span>)}
      <div>
        {state.weather.map((weather) => (
          <Weather
            cityName={weather.cityName}
            key={weather.id}
            onRemove={() => handleRemoveCity(weather.id)}
          />
        ))}
      </div>
    </>
  );
};

export default App;
