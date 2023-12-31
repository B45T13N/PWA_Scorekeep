import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardMatchs from './DashboardMatchs';
import {BrowserRouter} from "react-router-dom";

jest.mock('../../../hooks/useApi/useApi', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('../../../services/apiClient', () => ({
    get: jest.fn(),
    put: jest.fn(),
}));

describe('DashboardMatchs', () => {
    beforeEach(() => {
        // Reset the mock function before each test
        jest.clearAllMocks();
    });

    it('renders the component with loading state', () => {
        jest.requireMock('../../../hooks/useApi/useApi').default.mockReturnValue({
            data: [],
            meta: {
                current_page: 1,
                last_page: 1,
                per_page: 10,
                total: 0,
            },
            error: null,
            callApi: jest.fn(),
        });

        render(
            <BrowserRouter>
                <DashboardMatchs />
            </BrowserRouter>);

        // Assert that loading text is displayed
        expect(screen.getByText('Matchs Dashboard')).toBeInTheDocument();
    });

    it('renders the component with error state', () => {
        jest.requireMock('../../../hooks/useApi/useApi').default.mockReturnValue({
            data: [],
            meta: {
                current_page: 1,
                last_page: 1,
                per_page: 10,
                total: 0,
            },
            error: 'Error message',
            callApi: jest.fn(),
        });

        render(
            <BrowserRouter>
                <DashboardMatchs />
            </BrowserRouter>
        );

        expect(screen.getByText('Erreur lors de la récupération des matchs')).toBeInTheDocument();
    });

    it('renders the component with data and confirm button', () => {
        const mockData = [
            {
                id: 1,
                gameDate: '2023-09-15T12:00:00Z',
                visitorTeam: { name: 'Visitor Team' },
                category: 'Category A',
                isCancelled: true,
            },
        ];
        jest.requireMock('../../../hooks/useApi/useApi').default.mockReturnValue({
            data: mockData,
            meta: {
                current_page: 1,
                last_page: 1,
                per_page: 10,
                total: 0,
            },
            error: null,
            callApi: jest.fn(),
        });

        render(
            <BrowserRouter>
                <DashboardMatchs />
            </BrowserRouter>
        );

        expect(screen.getByText('Matchs Dashboard')).toBeInTheDocument();
        expect(screen.getByText('15/09/2023 14:00')).toBeInTheDocument();
        expect(screen.getByText('Visitor Team')).toBeInTheDocument();
        expect(screen.getByText('Category A')).toBeInTheDocument();
        expect(screen.getByText('Confirmer')).toBeInTheDocument();
    });

    it('renders the component with data and cancel or delete button', () => {
        const mockData = [
            {
                id: 1,
                gameDate: '2023-09-15T12:00:00Z',
                visitorTeam: { name: 'Visitor Team' },
                category: 'Category A',
                isCancelled: false,
            },
        ];
        jest.requireMock('../../../hooks/useApi/useApi').default.mockReturnValue({
            data: mockData,
            meta: {
                current_page: 1,
                last_page: 1,
                per_page: 10,
                total: 0,
            },
            error: null,
            callApi: jest.fn(),
        });

        render(
            <BrowserRouter>
                <DashboardMatchs />
            </BrowserRouter>
        );

        expect(screen.getByText('Matchs Dashboard')).toBeInTheDocument();
        expect(screen.getByText('15/09/2023 14:00')).toBeInTheDocument();
        expect(screen.getByText('Visitor Team')).toBeInTheDocument();
        expect(screen.getByText('Category A')).toBeInTheDocument();
        expect(screen.getByText('Annuler')).toBeInTheDocument();
        expect(screen.getByText('Supprimer')).toBeInTheDocument();
    });
});
