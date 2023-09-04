import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders h1', () => {
    render(<Dashboard />);
    const h1 = screen.getByText(/Hello from dashboard/i);
    expect(h1).toBeInTheDocument();
});
