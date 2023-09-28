import React from 'react';
import { render, screen } from '@testing-library/react';
import {Input} from "./Input";

test('renders Input', () => {
    render(<Input type={"text"} field={"email"} onChange={e => console.log(e)}/>);
    const input = screen.getByTestId(/input-test/i);
    expect(input).toBeInTheDocument();
});
