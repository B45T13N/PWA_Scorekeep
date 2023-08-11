import React from 'react';
import { render, screen } from '@testing-library/react';
import GenericTemplate from "./Layout";

test('renders template', () => {
    render(<GenericTemplate />);
    const h1 = screen.getByText(/Hello from home/i);
    expect(h1).toBeInTheDocument();
});