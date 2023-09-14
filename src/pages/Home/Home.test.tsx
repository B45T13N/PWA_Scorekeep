import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders h2', () => {
    render(<Home />);
    const h2 = screen.getByText(/Suivez, enregistrez et gérez vos Matchs avec Scorekeep/i);
    expect(h2).toBeInTheDocument();
});
