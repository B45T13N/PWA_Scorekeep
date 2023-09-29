import React from 'react';
import {act, render, screen} from '@testing-library/react';
import RegistrationVolunteerModal from './RegistrationVolunteerModal';

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

    it('renders correctly when isOpen is true', async () => {

        const axios = require('../../../services/apiClient');
        axios.get.mockResolvedValueOnce({
            data: {
                data: [
                    {id: 1, label: 'Secrétaire'},
                    {id: 2, label: 'Chronométreur'},
                    {id: 3, label: 'Responsable de salle'},
                    {id: 4, label: 'Buvette'}
                ],
            },
        });

        await act(async () => {

            render(<RegistrationVolunteerModal {...mockProps} />);

            await new Promise((resolve) => setTimeout(resolve, 0));

        });

        expect(screen.getByText('Annuler')).toBeInTheDocument();
        expect(screen.getByText("S'enregistrer")).toBeInTheDocument();
    });
});
