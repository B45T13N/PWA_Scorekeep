import React from 'react';
import { render, screen } from '@testing-library/react';
import GenericTemplate from "./Layout";


jest.mock("../../../hooks/useAuth/useAuth", () => ({
    useAuth: jest.fn(),
}));

test('renders template', () => {
    const mockUseAuth = {
        logout: () => {},
    };
    jest.requireMock("../../../hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);

    render(<GenericTemplate />);
    const h1 = screen.getByText(/SCOREKEEP/i);
    expect(h1).toBeInTheDocument();
});