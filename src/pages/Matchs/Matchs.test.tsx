import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import Matchs from "./Matchs";
import axios from "../../services/apiClient";

jest.mock('../../services/apiClient', () => ({
    get: jest.fn(),
    put: jest.fn(),
}));

describe('Matchs', () => {
    beforeEach(() => {
        // Reset the mock function before each test
        jest.clearAllMocks();
    });

    it('renders the component with loading state', async () => {
        const axios = require('../../services/apiClient');
        axios.get.mockResolvedValueOnce({
            data: {
                data: [
                    {
                        id: 1,
                        gameDate: '2023-09-15T10:00:00Z',
                        visitorTeam: {name: 'Team A'},
                        category: 'Category A',
                        isHomeMatch: true,
                    },
                ],
            },
        });

        render(<Matchs />);

        // Assert that loading text is displayed
        expect(screen.getByText('Les matchs')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Team A/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/Category A/i)).toBeInTheDocument();
        expect(screen.getByText(/Team A/i)).toBeInTheDocument();
    });

    it('renders the component with error state', async () => {
        const axios = require('../../services/apiClient');
        axios.get.mockRejectedValueOnce();

        render(
            <Matchs />
        );
        await waitFor(() => {
            expect(screen.getByText('Erreur lors de la récupération des équipes')).toBeInTheDocument();
        });

    });
});
