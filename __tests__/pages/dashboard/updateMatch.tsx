import React from 'react';
import {render, act, waitFor, screen} from '@testing-library/react';
import UpdateMatch from "@/pages/dashboard/matchs/edit/[matchId]";

jest.mock('next/router', () => ({
    useRouter() {
        return {
            query: { matchId: 'ad3bdba7-0f08-4ceb-a9f4-e4702b0a0950' },
        };
    },
}));

jest.mock('../../../app/services/apiClient', () => ({
    get: jest.fn(),
    put: jest.fn(),
}));

describe('UpdateMatch Component', () => {
    beforeEach(() => {
        // Reset the mock function before each test
        jest.clearAllMocks();
    });

    test('renders without crashing', async () => {
        // Mock the axios get method to return data
        const axios = require('../../../app/services/apiClient');
        axios.get.mockResolvedValueOnce({
            data: {
                data: {
                    gameDate: '2023-09-15T10:00:00Z',
                    visitorTeam: 'Team A',
                    category: 'Category A',
                    address: '123 Main St/12345/City',
                },
            },
        });

        render(
            <UpdateMatch/>
        );

        expect(screen.getByText(/chargement/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument();
        });
    });


    test('loads match data and displays form', async () => {
        // Mock the axios get method to return data
        const axios = require('../../../app/services/apiClient');

        const data = {
            gameDate: '2023-09-15T10:00:00Z',
            visitorTeam: {
                name: 'Team A',
            },
            category: 'Category A',
            address: '123 Main St/12345/City',
        }
        axios.get.mockResolvedValueOnce({
            data: {
                data,
            },
        });

        await act(async () => {
            render(
                <UpdateMatch />
            );

            await new Promise((resolve) => setTimeout(resolve, 0));

        });

        expect(screen.getByText('Date du match:')).toBeInTheDocument();
        expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
        expect(screen.getByDisplayValue('12345')).toBeInTheDocument();
        expect(screen.getByDisplayValue('City')).toBeInTheDocument();
    });

});