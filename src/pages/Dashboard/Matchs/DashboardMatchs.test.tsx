import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardMatchs from './DashboardMatchs';
import {BrowserRouter} from "react-router-dom";

jest.mock("../../../hooks/useAuth", () => ({
    useAuth: jest.fn(),
}));

test('renders h1', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../../../hooks/useAuth").useAuth.mockReturnValue(mockUseAuth);

    render(
        <BrowserRouter>
            <DashboardMatchs />
        </BrowserRouter>
    );
    const h1 = screen.getByText(/Matchs Dashboard/i);
    expect(h1).toBeInTheDocument();
});
