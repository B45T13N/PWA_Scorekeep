import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders header', () => {
    render(<Header />);
    const header = screen.getByText(/Hello from header/i);
    expect(header).toBeInTheDocument();
});