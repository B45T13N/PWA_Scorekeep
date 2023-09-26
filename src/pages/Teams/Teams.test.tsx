import React from 'react';
import { render, screen } from '@testing-library/react';
import Teams from './Teams';

jest.mock('../../hooks/useApi/useApi', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('Teams', () => {
    beforeEach(() => {
        // Reset the mock function before each test
        jest.clearAllMocks();
    });

    it('renders the component with loading state', () => {
        jest.requireMock('../../hooks/useApi/useApi').default.mockReturnValue({
            data: [],
            error: null,
            callApi: jest.fn(),
        });

        render(
            <Teams />);

        // Assert that loading text is displayed
        expect(screen.getByText('Les clubs')).toBeInTheDocument();
    });

    it('renders the component with error state', () => {
        jest.requireMock('../../hooks/useApi/useApi').default.mockReturnValue({
            data: [],
            error: true,
            callApi: jest.fn(),
        });

        render(
            <Teams />
        );

        expect(screen.getByText('Erreur lors de la récupération des équipes')).toBeInTheDocument();
    });

    it('renders the component with data', () => {
        const mockData = [
            {
                id: 1,
                name: 'Team name',
                logo: "logo",
            },
        ];
        jest.requireMock('../../hooks/useApi/useApi').default.mockReturnValue({
            data: mockData,
            error: null,
            isLoading: false,
            callApi: jest.fn(),
        });

        render(
            <Teams />
        );

        expect(screen.getByText('Les clubs')).toBeInTheDocument();
        expect(screen.getByText('Team name')).toBeInTheDocument();
    });
});
