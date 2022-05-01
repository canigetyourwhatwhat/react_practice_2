import PropTypes from 'prop-types';

const Header = ({onClick, onDisplayHistory, onDeleteHistory}) => {
  return (
    <>
      <h3>Weather Dashboard</h3>
      <button
        onClick={() => {
          onClick();
        }}
      >
        + Add Widget
      </button>
      <button
        onClick={() => {
          onDisplayHistory();
        }}
      >
        History
      </button>
      <button
        onClick={() => {
          onDeleteHistory();
        }}
      >
        Delete History
      </button>
    </>
  );
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  onDisplayHistory: PropTypes.func.isRequired,
  onDeleteHistory: PropTypes.func.isRequired,
};

export default Header;
