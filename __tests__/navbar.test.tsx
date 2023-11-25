import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/molecules/Navbar/Navbar';

jest.mock("../app/hooks/useAuth/useAuth", () => ({
    useAuth: jest.fn(),
}));
jest.mock('next/router', () => require('next-router-mock'));

test('renders navbar', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../app/hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);

    render(<Navbar />);
    const navbar = screen.getByTestId(/navbar/i);
    expect(navbar).toBeTruthy();
});

test('renders home link', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../app/hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);

    render(<Navbar />);
    const home = screen.getByText(/accueil/i);
    expect(home).toBeTruthy();
});

test('renders connexion link', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../app/hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);

    render(<Navbar />);
    const connexion = screen.getByText(/se connecter/i);
    expect(connexion).toBeTruthy();
});