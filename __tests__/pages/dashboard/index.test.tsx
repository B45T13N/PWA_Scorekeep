import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from "@/pages/dashboard";

jest.mock("../../../app/hooks/useAuth/useAuth", () => ({
    useAuth: jest.fn(),
}));

test('renders h1', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../../../app/hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);

    render(<Dashboard />);
    const h1 = screen.getByText(/panneau d'administration/i);
    expect(h1).toBeInTheDocument();
});