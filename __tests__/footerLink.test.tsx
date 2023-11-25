import React from 'react';
import { render, screen } from '@testing-library/react';
import {FooterLink} from "@/components/atoms/FooterLink/FooterLink";

test('renders footer', () => {
    render(<FooterLink link={"/footerLink"} innerText={"footerLink"} />);
    const footerLink = screen.getByText(/footerLink/i);
    expect(footerLink).toBeTruthy();
});
