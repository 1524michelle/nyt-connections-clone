// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import Button from './Button';

test('renders a button with the correct text', () => {
  render(<Button text="Test" onClick={() => {console.log("test");}} disabled={false} />);
  const buttonElement = screen.getByText(/test/i);
  expect(buttonElement).toBeInTheDocument();
});
