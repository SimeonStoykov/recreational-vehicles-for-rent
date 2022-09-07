import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const test = screen.getByText('Test');
  expect(test).toBeInTheDocument();
});
