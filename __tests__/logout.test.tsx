import React from 'react';
import { render, screen } from '@testing-library/react';
import {Logout} from "@/components/atoms/Logout/Logout";

jest.mock("../app/hooks/useAuth/useAuth", () => ({
    useAuth: jest.fn(),
}));
jest.mock('next/router', () => require('next-router-mock'));

test('renders Navlink', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../app/hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);

    render(<Logout />);
    const logout = screen.getByText(/se déconnecter/i);
    expect(logout).toBeTruthy();
});
