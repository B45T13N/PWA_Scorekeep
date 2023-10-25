import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchCard from "./MatchCard";

jest.mock('../../../services/apiClient', () => ({
    get: jest.fn(),
    put: jest.fn(),
}));

describe("RadioInputComponent", () => {
    test('renders radio input', () => {

        render(<MatchCard gameDate={new Date()}
                          visitorTeamName={"Visitor Team"}
                          category={"Junior"}
                          isHomeMatch={true}
                          gameId={"1"}/>);
        const teamName = screen.getByText(/Visitor Team/i);
        const category = screen.getByText(/Junior/i);
        expect(teamName).toBeInTheDocument();
        expect(category).toBeInTheDocument();
    });
})
