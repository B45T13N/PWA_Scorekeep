import React from 'react';
import {render, screen} from '@testing-library/react';
import AddMatch from './AddMatch';
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
describe('AddMatch Component', () => {
    beforeEach(() => {
        // Reset the mock function before each test
        jest.clearAllMocks();
    });
    test('renders without crashing', async () => {
        render(
                <BrowserRouter>
                    <AddMatch/>
                </BrowserRouter>
            );

        const h2 = screen.getByText(/Ajout d'un match/i);

        expect(h2).toBeInTheDocument();
    });
});
