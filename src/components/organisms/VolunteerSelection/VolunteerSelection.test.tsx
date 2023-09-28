import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import VolunteerSelection from './VolunteerSelection';
import apiClient from "../../../services/apiClient";


jest.mock('../../../services/apiClient', () => ({
    get: jest.fn(),
    put: jest.fn(),
}));

describe('VolunteerSelection', () => {
    const mockProps = {
        matchId: 1,
        matchCategory: 'Category',
        visitorTeamName: 'Visitor Team',
        matchDate: new Date(),
        isHomeMatch: false,
        timekeepers: [{id: 1, name: "timekeeper"}],
        roomManagers: [{id: 1, name: "roomManager"}],
        secretaries: [{id: 1, name: "secretary"}],
        timekeeperId: 2,
        secretaryId: 3,
        roomManagerId: 4,
    };

    it('renders without crashing', () => {
        render(
            <table>
                <tbody>
                <VolunteerSelection {...mockProps} />
                </tbody>
            </table>
        );
    });

    it('handles radio button selection for timekeepers', () => {
        render(
            <table>
                <tbody>
                <VolunteerSelection {...mockProps} />
                </tbody>
            </table>
        );

        const timekeeperRadioButton = screen.getByLabelText(mockProps.timekeepers[0].name);
        fireEvent.click(timekeeperRadioButton);

        expect(timekeeperRadioButton).toBeChecked();
    });

    it('handles radio button selection for secretaries', () => {
        render(
            <table>
                <tbody>
                <VolunteerSelection {...mockProps} />
                </tbody>
            </table>
        );

        const secretaryRadioButton = screen.getByLabelText(mockProps.secretaries[0].name);
        fireEvent.click(secretaryRadioButton);

        expect(secretaryRadioButton).toBeChecked();
    });

    it('handles radio button selection for room managers', () => {
        render(
            <table>
                <tbody>
                <VolunteerSelection {...mockProps} />
                </tbody>
            </table>
        );

        const roomManagerRadioButton = screen.getByLabelText(mockProps.roomManagers[0].name);
        fireEvent.click(roomManagerRadioButton);

        expect(roomManagerRadioButton).toBeChecked();
    });

    it('calls the handleClickButton function when "Mettre à jour" button is clicked', async () => {
        render(
            <table>
                <tbody>
                <VolunteerSelection {...mockProps} />
                </tbody>
            </table>);
        const updateButton = screen.getByText('Mettre à jour');
        const putMock = jest.spyOn(apiClient, 'put');
        const logSpy = jest.spyOn(global.console, 'log');
        putMock.mockResolvedValue({status: 200});

        fireEvent.click(updateButton);

        await Promise.resolve();

        expect(putMock).toHaveBeenCalledWith(
            `/api/games/addVolunteers/${mockProps.matchId}`,
            {
                timekeeperId: `${mockProps.timekeeperId}`,
                secretaryId: `${mockProps.secretaryId}`,
                roomManagerId: `${mockProps.roomManagerId}`,
            }
        );
        expect(logSpy).toHaveBeenCalledWith('Match updated successfully');
    });
});
