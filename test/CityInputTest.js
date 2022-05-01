import {render, screen, fireEvent} from '@testing-library/react';
import CityInput from '../src/components/CityInput';

describe('check CityInput', () => {
  test('checks if the button is properly pushed', () => {
    const onClick = jest.fn();
    render(<CityInput onCreateCity={onClick} />);
    const inputCityName = screen.getByTestId('cityName');
    fireEvent.change(inputCityName, {target: {value: 'Tartu'}});
    fireEvent.click(screen.getByTestId('button'));

    expect(onClick).toHaveBeenCalled();
  });
});
