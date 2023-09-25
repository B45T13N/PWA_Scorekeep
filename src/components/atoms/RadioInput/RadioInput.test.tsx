import React from 'react';
import { render, screen } from '@testing-library/react';
import RadioInput from "./RadioInput";

describe("RadioInputComponent", () => {
    test('renders radio input', () => {
        render(<RadioInput text={"turtle"} name={"turtles"} />);
        const label = screen.getByText(/turtle/i);
        expect(label).toBeInTheDocument();
        expect(label).toHaveAttribute("for", "turtles");

        const div = screen.getByTestId("parent-div")

        expect(div).toBeInTheDocument();
        expect(div).toHaveClass("radio-input")
    });

    test('renders radio input selected', () => {
        render(<RadioInput text={"turtle"} name={"turtles"} selected={true} />);
        const label = screen.getByText(/turtle/i);
        expect(label).toBeInTheDocument();
        expect(label).toHaveAttribute("for", "turtles");

        const div = screen.getByTestId("parent-div")

        expect(div).toBeInTheDocument();
        expect(div).toHaveClass("radio-input selected")
    });
})

