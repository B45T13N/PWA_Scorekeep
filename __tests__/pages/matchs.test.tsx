import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Matchs from "@/pages/matchs/[localTeamId]";
import apiClient from "@/services/apiClient";

jest.mock('../../app/services/apiClient', () => ({
    get: jest.fn(),
}));

jest.mock('next/router', () => ({
    useRouter() {
        return {
            query: { localTeamId: 'ad3bdba7-0f08-4ceb-a9f4-e4702b0a0950' },
        };
    },
}));

describe('Matchs Page', () => {
    it('renders the component with data', async () => {
        const mockData = {
            data: {
                data: [
                    {
                        uuid: 'ad3bdba7-0f08-4ceb-a9f4-e4702b0a0950',
                        gameDate: '2023-01-01T00:00:00Z',
                        visitorTeam: { name: 'Team A' },
                        category: 'Category A',
                        isHomeMatch: true,
                    },
                ],
            },
        };

        apiClient.get.mockImplementation(() => Promise.resolve(mockData));

        render(<Matchs />);

        await waitFor(() => {
            expect(screen.getByText('Les matchs')).toBeInTheDocument();
            expect(screen.getByText('Team A')).toBeInTheDocument();
            expect(screen.getByText('Category A')).toBeInTheDocument();
        });
    });

    it('renders a message when no matches are available', async () => {
        apiClient.get.mockImplementation(() => Promise.resolve({data: {data: []}}));

        render(<Matchs />);

        await waitFor(() => {
            expect(screen.getByText('Pas de matchs disponible.')).toBeInTheDocument();
        });
    });

    it('renders an error message on API call failure', async () => {
        apiClient.get.mockImplementation(() => Promise.reject('Erreur'));

        render(<Matchs />);

        await waitFor(() => {
            expect(screen.getByText('Erreur lors de la récupération des données')).toBeInTheDocument();
        });
    });
});
