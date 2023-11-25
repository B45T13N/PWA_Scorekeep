import React from 'react';
import { render, screen } from '@testing-library/react';
import GenericTemplate from "@/app/layout";
import Home from "@/pages/index";


jest.mock("../app/hooks/useAuth/useAuth", () => ({
    useAuth: jest.fn(),
}));
jest.mock('next/router', () => require('next-router-mock'));

test('renders template', () => {
    const mockUseAuth = {
        logout: () => {},
    };
    jest.requireMock("../app/hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);

    render(
        <GenericTemplate>
            <Home />
        </GenericTemplate>);
    const h1 = screen.getAllByText(/SCOREKEEP/i);
    expect(h1).toBeTruthy();
});