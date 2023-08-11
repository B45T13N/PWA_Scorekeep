import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders h1', () => {
    render(<Home />);
    const h1 = screen.getByText(/Hello from home/i);
    expect(h1).toBeInTheDocument();
});
