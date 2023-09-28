import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

jest.mock("../../../hooks/useAuth/useAuth", () => ({
    useAuth: jest.fn(),
}));

test('renders navbar', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../../../hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);

    render(<Navbar />);
    const navbar = screen.getByTestId(/navbar/i);
    expect(navbar).toBeInTheDocument();
});

test('renders home link', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../../../hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);

    render(<Navbar />);
    const home = screen.getByText(/accueil/i);
    expect(home).toBeInTheDocument();
});

test('renders connexion link', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../../../hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);

    render(<Navbar />);
    const connexion = screen.getByText(/se connecter/i);
    expect(connexion).toBeInTheDocument();
});