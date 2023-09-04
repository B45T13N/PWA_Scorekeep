import React from 'react';
import { render, screen } from '@testing-library/react';
import {DashboardLink} from "./DashboardLink";

test('renders link', () => {
    render(<DashboardLink innerText={"link"} link={"/matchs"}/>);
    const dashboardLink = screen.getByText(/link/i);
    expect(dashboardLink).toBeInTheDocument();
});