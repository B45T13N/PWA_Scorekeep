import React from 'react';
import { render, screen } from '@testing-library/react';
import VolunteerSelection from "./VolunteerSelection";

jest.mock("../../../hooks/useAuth/useAuth", () => ({
    useAuth: jest.fn(),
}));

test('renders ', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../../../hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);
    const h2 = screen.getByText(/Scorekeep/i);
    expect(h2).toBeInTheDocument();
});
