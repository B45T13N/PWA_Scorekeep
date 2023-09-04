import React from 'react';
import { render, screen } from '@testing-library/react';
import Matchs from './Matchs';

test('renders h1', () => {
    render(<Matchs />);
    const h1 = screen.getByText(/Hello from matchs/i);
    expect(h1).toBeInTheDocument();
});
