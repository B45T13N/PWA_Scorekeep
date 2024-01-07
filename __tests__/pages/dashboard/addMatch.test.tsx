import React from 'react';
import {render, screen} from '@testing-library/react';
import AddMatch from "@/pages/dashboard/matchs/add";

jest.mock('next/router', () => ({
    useRouter() {
        return {
            query: { localTeamId: 'ad3bdba7-0f08-4ceb-a9f4-e4702b0a0950' },
        };
    },
}));
jest.mock('../../../app/services/apiClient', () => ({
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
            <AddMatch/>
        );

        const h2 = screen.getByText(/Ajout d'un match/i);

        expect(h2).toBeInTheDocument();
    });
});