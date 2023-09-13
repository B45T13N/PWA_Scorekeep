import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import for expect assertions
import UpdateMatch from './UpdateMatch';
import {BrowserRouter} from "react-router-dom";


jest.mock("../../../hooks/useAuth/useAuth", () => ({
    useAuth: jest.fn(),
}));

jest.mock('../../../hooks/useApi/useApi', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('UpdateMatch', () => {
    beforeEach(() => {
        // Reset the mock function before each test
        jest.clearAllMocks();
    });

    it('renders the component with loading state', () => {
        jest.requireMock('../../../hooks/useApi/useApi').default.mockReturnValue({
            data: [],
            error: null,
            isLoading: true,
            callApi: jest.fn(),
        });
        const mockUseAuth = {
            logout: () => {}
        };
        jest.requireMock("../../../hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);

        render(
            <BrowserRouter>
                <UpdateMatch />
            </BrowserRouter>);

        // Assert that loading text is displayed
        expect(screen.getByText('Matchs Dashboard')).toBeInTheDocument();
    });

    it('renders the component with error state', () => {
        jest.requireMock('../../../hooks/useApi/useApi').default.mockReturnValue({
            data: [],
            error: 'Error message',
            isLoading: false,
            callApi: jest.fn(),
        });
        const mockUseAuth = {
            logout: () => {}
        };
        jest.requireMock("../../../hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);

        render(
            <BrowserRouter>
                <UpdateMatch />
            </BrowserRouter>
        );

        expect(screen.getByText('Erreur lors de la récupération des matchs')).toBeInTheDocument();
    });

    it('renders the component with data', () => {
        const mockData = [
            {
                id: 1,
                gameDate: '2023-09-15T12:00:00Z',
                visitorTeam: { name: 'Visitor Team' },
                category: 'Category A',
            },
        ];
        jest.requireMock('../../../hooks/useApi/useApi').default.mockReturnValue({
            data: mockData,
            error: null,
            isLoading: false,
            callApi: jest.fn(),
        });
        const mockUseAuth = {
            logout: () => {}
        };
        jest.requireMock("../../../hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);
        render(
            <BrowserRouter>
                <UpdateMatch />
            </BrowserRouter>
        );

        expect(screen.getByText('Matchs Dashboard')).toBeInTheDocument();
        expect(screen.getByText('15/09/2023 14:00')).toBeInTheDocument();
        expect(screen.getByText('Visitor Team')).toBeInTheDocument();
        expect(screen.getByText('Category A')).toBeInTheDocument();
    });
});
