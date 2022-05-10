const SERVER_ADDRESS = 'https://forecast-ut-88jlk.ondigitalocean.app';

import PropTypes from 'prop-types';

import {Fragment, useReducer, useState, createContext, useContext} from 'react';
import CityInput from './CityInput';
import Nav from './Header';
import Weather from './Weather';
import {
  reducer,
  initializer,
  createWeather,
  removeWeather,
  // removeHistory,
} from '../reducer.js';
import {BrowserRouter as Router, Link, Route, Routes, useParams} from 'react-router-dom';


const Home = ({state, onRemoveCity, onCreateCity}) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        onCreateCity(cityName);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!!error && <p> {error} </p>}
      {<CityInput onCreateCity={handleCreateCity} disabled={isLoading} />}
      <div>
        {state.weather.map((weather) => (
          <Weather
            cityName={weather.cityName}
            key={weather.id}
            onRemove={() => onRemoveCity(weather.id)}
          />
        ))}
      </div>
    </>
  );
};

Home.propTypes = {
  state: PropTypes.objectOf(PropTypes.array).isRequired,
  onRemoveCity: PropTypes.func.isRequired,
  onCreateCity: PropTypes.func.isRequired,
};

const AppContext = createContext(null);

const App = () => {
  const [state, dispatch] = useReducer(reducer, null, initializer);

  const handleRemoveCity = (id) => dispatch(removeWeather(id));
  const handleCreateCity = (id) => dispatch(createWeather(id));

  return (
    <AppContext.Provider value={state.weather}>
      <Router>
        {<Nav/>}
        <Routes>
          <Route path='/' element={
            <Home
              state={state}
              onRemoveCity={handleRemoveCity}
              onCreateCity={handleCreateCity}
            />}
          />
          <Route path='/widgets/:id' element={<Widget onRemoveCity={handleRemoveCity} />} />
          <Route path='/history' element={<History historyList={state.history} />} />
          <Route path='/widgets' element={<Widgets cityLists={state.weather}/>} />;
          <Route path='*' />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

const Widget = ({onRemoveCity}) => {
  const {id} = useParams();
  const value = useContext(AppContext);
  const element = value.find((element) => element.id == id);
  return (
    <>
      {(element !== undefined) ?
        <Weather
          cityName={element.cityName}
          onRemove={() => onRemoveCity(element.id)}/> :
        'There is no widget for this id'}
    </>
  );
};

Widget.propTypes = {
  onRemoveCity: PropTypes.func.isRequired,
};

const Widgets = ({cityLists}) => {
  return (
    <>
      <h1>Widgets list</h1>
      {cityLists.map((city) => (
        <p key={city.id}>
          <Link to={`/widgets/${city.id}`}>{city.cityName}</Link>
        </p>
      ))}
    </>
  );
};

Widgets.propTypes = {
  cityLists: PropTypes.arrayOf(PropTypes.object),
};

const History = ({historyList}) => {
  return (
    <>
      <h1>History</h1>
      <ul>
        {historyList.map((item, index) => <p key={index}> {item} </p>)}
      </ul>
    </>
  );
};

History.propTypes = {
  historyList: PropTypes.arrayOf(PropTypes.string),
};

export default App;
