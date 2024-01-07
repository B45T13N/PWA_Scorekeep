import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardMatchs from "@/pages/dashboard/matchs";
import Router from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock("../../../app/hooks/useAuth/useAuth", () => ({
    useAuth: jest.fn(),
}));

jest.mock('../../../app/hooks/useApi/useApi', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('../../../app/services/apiClient', () => ({
    get: jest.fn(),
    put: jest.fn(),
}));

describe('DashboardMatchs', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        const mockUseAuth = {
            logout: () => {}
        };
        jest.requireMock("../../../app/hooks/useAuth/useAuth").useAuth.mockReturnValue(mockUseAuth);
    });

    it('renders the component with loading state', () => {
        jest.requireMock('../../../app/hooks/useApi/useApi').default.mockReturnValue({
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
            <DashboardMatchs />
        );

        // Assert that loading text is displayed
        expect(screen.getByText('Matchs Dashboard')).toBeInTheDocument();
    });

    it('renders the component with error state', () => {
        jest.requireMock('../../../app/hooks/useApi/useApi').default.mockReturnValue({
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
            <DashboardMatchs />
        );

        expect(screen.getByText('Erreur lors de la récupération des matchs')).toBeInTheDocument();
    });

    it('renders the component with data and confirm button', () => {
        const mockData = [
            {
                uuid: '123',
                gameDate: '2023-09-15T12:00:00Z',
                visitorTeam: { name: 'Visitor Team' },
                category: 'Category A',
                isCancelled: true,
            },
        ];
        jest.requireMock('../../../app/hooks/useApi/useApi').default.mockReturnValue({
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
            <DashboardMatchs />
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
                uuid: '123',
                gameDate: '2023-09-15T12:00:00Z',
                visitorTeam: { name: 'Visitor Team' },
                category: 'Category A',
                isCancelled: false,
            },
        ];
        jest.requireMock('../../../app/hooks/useApi/useApi').default.mockReturnValue({
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
            <DashboardMatchs />
        );

        expect(screen.getByText('Matchs Dashboard')).toBeInTheDocument();
        expect(screen.getByText('15/09/2023 14:00')).toBeInTheDocument();
        expect(screen.getByText('Visitor Team')).toBeInTheDocument();
        expect(screen.getByText('Category A')).toBeInTheDocument();
        expect(screen.getByText('Annuler')).toBeInTheDocument();
        expect(screen.getByText('Supprimer')).toBeInTheDocument();
    });
});