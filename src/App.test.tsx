import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders search input', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test("doesn't render vehicle list initially", () => {
  render(<App />);
  const vehicleList = screen.queryByRole('list');
  expect(vehicleList).not.toBeInTheDocument();
});

test('updates search value when the user types in the search input', () => {
  render(<App />);
  const searchInput = screen.getByRole('textbox');
  userEvent.type(searchInput, 'test');
  expect(searchInput).toHaveValue('test');
});
