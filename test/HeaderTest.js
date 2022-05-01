import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../src/components/Header';

describe('check Header', () => {
  test('simply checks whether there is a Header component', () => {
    const onClick = jest.fn();
    const {getByText} = render(<Header onClick={onClick} onDisplayHistory={onClick} />);

    userEvent.click(getByText('+ Add Widget'));

    expect(onClick).toHaveBeenCalled();
  });

  test('show the history of the city names on the screen', () => {
    const onClick = jest.fn();
    const {getByText} = render(<Header onClick={onClick} onDisplayHistory={onClick} />);

    userEvent.click(getByText('History'));

    expect(onClick).toHaveBeenCalled();
  });

  test('delete the history of the city names on the screen', () => {
    const onClick = jest.fn();
    const {getByText} = render(<Header onClick={onClick} onDeleteHistory={onClick} />);

    userEvent.click(getByText('Delete History'));

    expect(onClick).toHaveBeenCalled();
  });
});
