import React from 'react';
import { render, screen } from '@testing-library/react';
import Connexion from './Connexion';
import {BrowserRouter} from "react-router-dom";

jest.mock("../../hooks/useAuth", () => ({
    useAuth: jest.fn(),
}));
test('renders h1', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../../hooks/useAuth").useAuth.mockReturnValue(mockUseAuth);

    render(
        <BrowserRouter>
            <Connexion />
        </BrowserRouter>
    );
    const h1 = screen.getByText(/Se connecter/i);
    expect(h1).toBeInTheDocument();
});
