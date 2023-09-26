import React from 'react';
import { render, screen } from '@testing-library/react';
import TeamCard from "./TeamCard";

describe("RadioInputComponent", () => {
    test('renders radio input', () => {

        render(<TeamCard link={"/"} logoPath={""} teamName={"turtle gang"} />);
        const teamName = screen.getByText(/turtle gang/i);
        expect(teamName).toBeInTheDocument();
    });
})
