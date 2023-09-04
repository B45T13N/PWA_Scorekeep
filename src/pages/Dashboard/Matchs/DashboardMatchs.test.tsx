import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardMatchs from './DashboardMatchs';

test('renders h1', () => {
    render(<DashboardMatchs />);
    const h1 = screen.getByText(/matchs dashboard/i);
    expect(h1).toBeInTheDocument();
});
