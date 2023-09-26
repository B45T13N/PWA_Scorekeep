import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchCard from "./MatchCard";

describe("RadioInputComponent", () => {
    test('renders radio input', () => {

        render(<MatchCard date={new Date()} visitorTeamName={"Visitor Team"} category={"Junior"} isHomeMatch={true}/>);
        const teamName = screen.getByText(/Visitor Team/i);
        const category = screen.getByText(/Junior/i);
        expect(teamName).toBeInTheDocument();
        expect(category).toBeInTheDocument();
    });
})
