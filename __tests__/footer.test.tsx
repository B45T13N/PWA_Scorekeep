import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from "@/components/organisms/Footer/Footer";

test('renders footer', () => {
    render(<Footer />);
    const copyright = screen.getByText(/Tous droits réservés/i);
    expect(copyright).toBeTruthy();
});
