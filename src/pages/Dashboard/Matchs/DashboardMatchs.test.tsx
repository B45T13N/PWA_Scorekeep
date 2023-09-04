import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardMatchs from './DashboardMatchs';

jest.mock("../../../hooks/useAuth", () => ({
    useAuth: jest.fn(),
}));

test('renders h1', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../../../hooks/useAuth").useAuth.mockReturnValue(mockUseAuth);
});
