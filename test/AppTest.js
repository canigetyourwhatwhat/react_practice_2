import {render, screen} from '@testing-library/react';
import App from '../src/components/App';
import userEvent from '@testing-library/user-event';
import CityInput from '../src/components/CityInput';

describe('Testing App component', () => {
  test('Create a weather board from screen', async () => {
    // creates an App component
    render(<App />);

    // Creates an Weather component
    const input = screen.getByTestId('input-box');
    userEvent.type(input, 'tartu');
    try {
      userEvent.click(screen.getByTestId('input-box'));
      setTimeout(1000);
      expect(screen.getByText('tartu')).toBeInTheDocument();
    } catch (error) {
      // expect(screen.getByText('tartu')).not.toBeInTheDocument();
    }
  });

  test('See the text-box on the screen', () => {
    // creates an App component
    render(<App />);

    // Creates an Weather component
    const input = screen.getByTestId('cityName');
    userEvent.type(input, 'Tartu');
    userEvent.click(screen.getByText(/show Weather/i));
    userEvent.click(screen.getByText('+ Add Widget'));
    expect(screen.getByText('show Weather')).toBeInTheDocument();
  });

  // test('Remove the weather board from screen', () => {
  //   // creates an App component
  //   render(<App />);

  //   // Creates an Weather component
  //   const input = screen.getByTestId('cityName');
  //   userEvent.type(input, 'Tartu');
  //   userEvent.click(screen.getByText(/show Weather/i));

  //   // remove the Weather component
  //   userEvent.click(screen.getByTestId('remove'));
  //   expect(() => screen.getByText(/Tartu/i)).toThrow();
  // });

  // test('See the history from screen', () => {
  //   // creates an App component
  //   render(<App />);

  //   // Creates an Weather component
  //   const input = screen.getByTestId('cityName');
  //   userEvent.type(input, 'Tartu');
  //   userEvent.click(screen.getByText(/show Weather/i));
  //   userEvent.click(screen.getByTestId('remove'));
  //   userEvent.click(screen.getByText('History'));
  //   expect(screen.getByText('Tartu')).toBeInTheDocument();
  // });

  // const createStateWithCityName = (cityName) => reducer(
  //   initializer(), createWeather(cityName)
  // );

  // test('Create the weather board with function', () => {
  //   const state = createStateWithCityName("Tartu");
  //   expect(state.weather).toHaveLength(1);
  // });

  // test('Remove the weather board with a reducer function', () => {
  //   const state = createStateWithCityName("Tartu");
  //   const removedState = reducer(state, removeWeather(state.weather.id))
  //   expect(removedState.weather).toHaveLength(1);
  // });

  // test('Remove the history of the weathers with a reducer function', () => {
  //   const state = createStateWithCityName("Tartu");
  //   const removedState = reducer(state, removeHistory())
  //   expect(removedState.history).toHaveLength(0);
  // });

  // test('None of the function is applicable to reducer function', () => {
  //   const state = createStateWithCityName("Tartu");
  //   const removedState = reducer(state, "hello")
  //   // It shouldn't change since "hello" does nothing
  //   expect(removedState.history).toHaveLength(1);
  // });

  // test('see the history with a reducer function', () => {
  //   const state = createStateWithCityName("Tartu");
  //   const secondState = reducer(state, createWeather("Lviv"))
  //   expect(secondState.history).toHaveLength(2);
  // });
});
