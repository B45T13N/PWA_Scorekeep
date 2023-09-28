import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

jest.mock("../../../hooks/useAuth/useAuth", () => ({
    useAuth: jest.fn(),
}));

test('renders header', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../../../hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);
    render(<Header />);
    const header = screen.getByText(/Scorekeep/i);
    expect(header).toBeInTheDocument();
});
