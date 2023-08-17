import React from 'react';
import { render, screen } from '@testing-library/react';
import {Button} from "./Button";

test('renders button', () => {
    render(<Button text={"valid"} type={"submit"}/>);
    const footerLink = screen.getByText(/valid/i);
    expect(footerLink).toBeInTheDocument();
});
