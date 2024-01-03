import React from 'react';
import { render, screen } from '@testing-library/react';
import Connexion from '@/pages/login/index';

jest.mock('../app/hooks/useAuth/useAuth', () => ({
    useAuth: jest.fn(),
}));

jest.mock('next/router', () => require('next-router-mock'));

test('renders h1', () => {
    const mockUseAuth = {
        logout: () => {},
    };
    jest.requireMock('../app/hooks/useAuth/useAuth').useAuth.mockReturnValue(mockUseAuth);

    render(<Connexion />);
    const h1 = screen.getByText(/Se connecter/i);
    expect(h1).toBeTruthy();
});
