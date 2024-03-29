import React from 'react';
import { render, screen } from '@testing-library/react';
import {Button} from "@/components/atoms/Button/Button";

test('renders button', () => {
    render(<Button text={"valid"} type={"submit"}/>);
    const button = screen.getByText(/valid/i);
    expect(button).toBeTruthy();
});
