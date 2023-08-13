import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('renders navbar', () => {
    render(<Navbar />);
    const navbar = screen.getByTestId(/navbar/i);
    expect(navbar).toBeInTheDocument();
});

test('renders home link', () => {
    render(<Navbar />);
    const home = screen.getByText(/accueil/i);
    expect(home).toBeInTheDocument();
});

test('renders connexion link', () => {
    render(<Navbar />);
    const connexion = screen.getByText(/se connecter/i);
    expect(connexion).toBeInTheDocument();
});