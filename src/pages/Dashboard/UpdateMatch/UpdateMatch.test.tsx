import React from 'react';
import { render, act, screen } from '@testing-library/react';
import UpdateMatch from './UpdateMatch';
import {BrowserRouter} from "react-router-dom";
import axios from "../../../services/apiClient";

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

    it('renders without crashing', async () => {
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

        act(() => {
            render(
                <BrowserRouter>
                    <UpdateMatch/>
                </BrowserRouter>
            );
        });

        expect(screen.getByText(/chargement/i)).toBeInTheDocument();
    });


    it('loads match data and displays form', async () => {
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

        let getByText, getByLabelText, getByDisplayValue;

        await act(async () => {
            const component = render(
                <BrowserRouter>
                    <UpdateMatch />
                </BrowserRouter>
            );

            // Wait for the data to load
            await new Promise((resolve) => setTimeout(resolve, 0));

            // Get query functions within the act block
            getByText = component.getByText;
            getByLabelText = component.getByLabelText;
            getByDisplayValue = component.getByDisplayValue;
        });

        expect(getByText('Date du match:')).toBeInTheDocument();
        expect(getByDisplayValue('123 Main St')).toBeInTheDocument();
        expect(getByDisplayValue('12345')).toBeInTheDocument();
        expect(getByDisplayValue('City')).toBeInTheDocument();
    });

});
