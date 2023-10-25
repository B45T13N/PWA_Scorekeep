import React from 'react';
import { render, screen } from '@testing-library/react';
import {Navlink} from "./Navlink";

test('renders Navlink', () => {
    render(<Navlink innerText={"navlink"} link={"/navlink"} />);
    const navlink = screen.getByText(/navlink/i);
    expect(navlink).toBeInTheDocument();
    expect(navlink).toHaveAttribute("href", "/navlink");
    expect(navlink).toHaveAttribute("about", `Lien de navigation pour : navlink`);
});
