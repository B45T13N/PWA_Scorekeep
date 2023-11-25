import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RadioInput from "@/components/atoms/RadioInput/RadioInput";

describe("RadioInputComponent", () => {
    test('renders radio input', () => {

        const handleRadioSelect = () => {
        };

        render(<RadioInput id={"1"} text={"turtle"} name={"turtles"} isSelected={true} onSelect={handleRadioSelect} />);
        const label = screen.getByText(/turtle/i);
        expect(label).toBeTruthy();
        expect(label).toHaveAttribute("for", "1");

        const div = screen.getByTestId("parent-div")

        expect(div).toBeTruthy();
        expect(div).toHaveClass("radio-input")
    });
})

