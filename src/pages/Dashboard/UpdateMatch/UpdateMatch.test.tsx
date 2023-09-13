import React from 'react';
import {render, act, waitFor, screen} from '@testing-library/react';
import UpdateMatch from './UpdateMatch';
import {BrowserRouter} from "react-router-dom";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        matchId: '1', // Replace with a suitable mock value
    }),
}));

jest.mock('../../../services/apiClient', () => ({
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
        const axios = require('../../../services/apiClient');
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
            <BrowserRouter>
                <UpdateMatch/>
            </BrowserRouter>
        );

        expect(screen.getByText(/chargement/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument();
        });
    });


    test('loads match data and displays form', async () => {
        // Mock the axios get method to return data
        const axios = require('../../../services/apiClient');

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
                <BrowserRouter>
                    <UpdateMatch />
                </BrowserRouter>
            );

            await new Promise((resolve) => setTimeout(resolve, 0));

        });

        expect(screen.getByText('Date du match:')).toBeInTheDocument();
        expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
        expect(screen.getByDisplayValue('12345')).toBeInTheDocument();
        expect(screen.getByDisplayValue('City')).toBeInTheDocument();
    });

});
