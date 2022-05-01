const SERVER_ADDRESS = 'https://forecast-ut-88jlk.ondigitalocean.app';

import {useState, useEffect} from 'react';
import {convert} from '../helper';
import useMagnitude from '../hooks/useMagnitude';
import PropTypes from 'prop-types';

const Weather = (props) => {
  const [mode, setMode] = useState('C');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState({
    temperature: null,
    precipitation: null,
    wind: null,
  });

  const {magnitude, initiateConnections, closeConnections} = useMagnitude(props.cityName);

  const fetchInfo = async () => {
    try {
      const url = SERVER_ADDRESS + '/forecast/' + props.cityName;
      setError('');
      setIsLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        setInfo({
          temperature: result.data.temperature,
          precipitation: result.data.precipitation,
          wind: result.data.wind,
          cityName: result.data.city,
          magnitude: null,
        });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTempChange = (event) => {
    setMode(event.target.checked ? 'F' : 'C');
  };

  const handleClick = () => {
    fetchInfo();
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className='block'>
      <div className='container'>
        <section>
          <button data-testid='remove' type='button' onClick={props.onRemove} disabled={isLoading}>
            remove
          </button>
          <h2>{props.cityName}</h2>
          {isLoading && <p>Loading ...</p>}
          {!!error && <p> {error} </p>}
          <input
            type='checkbox'
            onChange={handleTempChange}
            checked={mode === 'F'}
            disabled={isLoading}
          />{' '}
          Display F
          <p>
            Temperature:{' '}
            <span data-testid='temperature'>
              {mode === 'C' ? info.temperature + ' C' : convert(info.temperature) + ' F'}
            </span>
          </p>
          <p>
            Precipitation: <span>{info.precipitation}</span>
          </p>
          <p>
            Wind: <span>{info.wind}</span>km/h
          </p>
          <p>
            Magnitude: {magnitude}
            <meter
              id='fuel'
              min='0'
              max='10'
              low='4.9'
              high='5.9'
              optimum='8.0'
              value={magnitude}
            ></meter>
          </p>
        </section>
        <section>
          <button onClick={handleClick} disabled={isLoading}>
            generate
          </button>
          <button onClick={initiateConnections}> Start Connection </button>
          <button onClick={closeConnections}> Stop Connection </button>
        </section>
      </div>
    </div>
  );
};

Weather.propTypes = {
  cityName: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Weather;
