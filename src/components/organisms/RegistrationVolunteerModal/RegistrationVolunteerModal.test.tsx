import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import RegistrationVolunteerModal from './RegistrationVolunteerModal';
import apiClient from "../../../services/apiClient";


jest.mock('../../../services/apiClient', () => ({
    get: jest.fn(),
    post: jest.fn(),
}));

describe('RegistrationVolunteerModal', () => {

    const mockProps = {
        isOpen: true,
        toggle: jest.fn(),
        gameDate: new Date(),
        visitorTeamName: 'Example Team',
        gameCategory: 'Example Category',
        gameId: '12345',
    };

    it('renders correctly when isOpen is true', () => {

        render(<RegistrationVolunteerModal {...mockProps} />);

        // Ensure that the modal content is displayed
        expect(screen.getByText('Example Category contre Example Team')).toBeInTheDocument();
        expect(screen.getByText('Annuler')).toBeInTheDocument();
        // Add more assertions for other elements as needed
    });

    it('calls the toggle function when the close button is clicked', () => {

        render(<RegistrationVolunteerModal {...mockProps} />);

        const closeButton = screen.getByText('Annuler');
        fireEvent.click(closeButton);

        // Ensure that the toggle function is called when the close button is clicked
        expect(mockProps.toggle).toHaveBeenCalled();
    });
});
