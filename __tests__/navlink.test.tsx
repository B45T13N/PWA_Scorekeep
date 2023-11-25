import React from 'react';
import { render, screen } from '@testing-library/react';
import {Navlink} from "@/components/atoms/Navlink/Navlink";

test('renders Navlink', () => {
    render(<Navlink innerText={"navlink"} link={"/navlink"} />);
    const navlink = screen.getByText(/navlink/i);
    expect(navlink).toBeTruthy();
    expect(navlink).toHaveAttribute("href", "/navlink");
    expect(navlink).toHaveAttribute("about", `Lien de navigation pour : navlink`);
});
