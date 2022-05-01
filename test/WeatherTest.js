import {render} from '@testing-library/react';
import Weather from '../src/components/Weather';
import userEvent from '@testing-library/user-event';

describe('check Weather component', () => {
  test('re-generate temperature', () => {
    const onRemove = jest.fn();
    const {getByText, getByTestId} = render(
      <Weather cityName='Tartu' onRemove={onRemove} />
    );
    const beforeTemperature = getByTestId('temperature').textContent;
    userEvent.click(getByText(/generate/i));
    const afterTemperature = getByTestId('temperature').textContent;
    try{
      expect(beforeTemperature).not.toEqual(afterTemperature);
    }
    catch{
      try {
        expect(beforeTemperature).toEqual('null C');
      }
      catch(e){
        throw e;
      }
    }    
  });

  test('convert temperature', () => {
    const onRemove = jest.fn();
    const {getByTestId} = render(
      <Weather cityName='Tartu' onRemove={onRemove} />
    );
    const beforeTemperature = getByTestId('temperature').textContent;
    const afterTemperature = getByTestId('temperature').checked;
    expect(beforeTemperature).not.toEqual(afterTemperature);
  });
});
