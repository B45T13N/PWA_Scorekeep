import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchCard from "@/components/organisms/MatchCard/MatchCard";
import apiClient from "@/app/services/apiClient";

jest.mock('../app/services/apiClient', () => ({
    get: jest.fn(),
    put: jest.fn(),
}));

describe("RadioInputComponent", () => {
    test('renders radio input', () => {

        apiClient.get.mockResolvedValue({
            data: [
                { id: '1', name: 'Volunteer Type 1' },
                { id: '2', name: 'Volunteer Type 2' },
            ],
        });

        render(<MatchCard gameDate={new Date()}
                          visitorTeamName={"Visitor Team"}
                          category={"Junior"}
                          isHomeMatch={true}
                          gameId={"1"}/>);
        const teamName = screen.getByText(/Visitor Team/i);
        const category = screen.getByText(/Junior/i);
        expect(teamName).toBeTruthy();
        expect(category).toBeTruthy();
    });
})
