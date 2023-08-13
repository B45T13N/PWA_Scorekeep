import React from 'react';
import { render, screen } from '@testing-library/react';
import {FooterLink} from "./FooterLink";

test('renders footer', () => {
    render(<FooterLink link={"/footerLink"} innerText={"footerLink"} />);
    const footerLink = screen.getByText(/footerLink/i);
    expect(footerLink).toBeInTheDocument();
});
