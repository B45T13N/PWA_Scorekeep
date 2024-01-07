import React from 'react';
import { render, screen } from '@testing-library/react';
import Volunteers from "@/pages/dashboard/volunteers";

jest.mock('../../../app/hooks/useApi/useApi', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('../../../app/services/apiClient', () => ({
    get: jest.fn(),
    put: jest.fn(),
}));


const mockData = [
    {
        uuid: '123',
        visitorTeam: { name: 'Visitor Team 1' },
        category: 'Category 1',
        gameDate: new Date('2023-09-30T12:00:00'),
        isHomeMatch: true,
        timekeepers: [],
        roomManagers: [],
        secretaries: [],
        drinkManagers: [],
        roomManager: { id: 101 },
        timekeeper: { id: 102 },
        secretary: { id: 103 },
        drinkManager: { id: 103 },
    },
];

describe('Volunteers', () => {
    it('renders without crashing', () => {
        jest.requireMock('../../../app/hooks/useApi/useApi').default.mockReturnValue({
            data: mockData,
            meta: {
                current_page: 1,
                last_page: 1,
                per_page: 10,
                total: 0,
            },
            error: null,
            isLoading: false,
            callApi: jest.fn(),
        });

        render(<Volunteers />);
    });

    it('fetches data and renders VolunteerSelection components', async () => {
        // Arrange
        jest.requireMock('../../../app/hooks/useApi/useApi').default.mockReturnValue({
            data: mockData,
            meta: {
                current_page: 1,
                last_page: 1,
                per_page: 10,
                total: 0,
            },
            error: null,
            isLoading: false,
            callApi: jest.fn(),
        });

        // Act
        render(
            <Volunteers />
        );

        // Assert
        expect(screen.getByText('Bénévoles de la semaine')).toBeInTheDocument();
        const volunteerSelectionComponents = screen.getAllByRole('row');
        expect(volunteerSelectionComponents.length).toBe(mockData.length + 1);
    });

});