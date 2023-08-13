import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('renders navbar', () => {
    render(<Navbar />);
    const header = screen.getByText(/Hello from header/i);
    expect(header).toBeInTheDocument();
});
