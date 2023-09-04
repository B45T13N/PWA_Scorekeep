import React from 'react';
import { render, screen } from '@testing-library/react';
import {Logout} from "./Logout";

jest.mock("../../../hooks/useAuth", () => ({
    useAuth: jest.fn(),
}));

test('renders Navlink', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../../../hooks/useAuth").useAuth.mockReturnValue(mockUseAuth);

    render(<Logout />);
    const logout = screen.getByText(/se déconnecter/i);
    expect(logout).toBeInTheDocument();
});
