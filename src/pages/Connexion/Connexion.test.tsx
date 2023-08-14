import React from 'react';
import { render, screen } from '@testing-library/react';
import Connexion from './Connexion';

test('renders h1', () => {
    render(<Connexion />);
    const h1 = screen.getByText(/Hello from home/i);
    expect(h1).toBeInTheDocument();
});
