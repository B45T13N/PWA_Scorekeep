import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/components/organisms/Header/Header';

jest.mock("../app/hooks/useAuth/useAuth", () => ({
    useAuth: jest.fn(),
}));

jest.mock('next/router', () => require('next-router-mock'));

test('renders header', () => {
    const mockUseAuth = {
        logout: () => {}
    };
    jest.requireMock("../app/hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);
    render(<Header />);
    const header = screen.getByText(/Scorekeep/i);
    expect(header).toBeTruthy();
});
