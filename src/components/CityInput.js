import {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

function useAutoFocus() {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return inputRef;
}

const CityInput = ({onCreateCity, disabled}) => {
  const [value, setValue] = useState('');
  const inputRef = useAutoFocus();
  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const handleClickEvent = (e) => {
    e.preventDefault();
    onCreateCity(value);
  };

  const isEmpty = value === '';
  const tooLong = value.length >= 20;

  return (
    <div>
      <form onSubmit={(e) => handleClickEvent(e)}>
        <input
          disabled={disabled}
          data-testid='input-box'
          type='text'
          value={value}
          onChange={handleChange}
          ref={inputRef}
        />
        <input
          type='submit'
          value='show Weather'
          data-testid='submit-button'
          disabled={isEmpty || tooLong || disabled}
        />
        {tooLong && <p>City name is too long</p>}
      </form>
    </div>
  );
};

CityInput.propTypes = {
  onCreateCity: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CityInput;
