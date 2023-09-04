import React from 'react';
import { render, screen } from '@testing-library/react';
import {Logout} from "./Logout";

test('renders Navlink', () => {
    render(<Logout />);
    const logout = screen.getByText(/se déconnecter/i);
    expect(logout).toBeInTheDocument();
});
