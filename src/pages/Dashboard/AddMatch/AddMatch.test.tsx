import React from 'react';
import {render, act, waitFor} from '@testing-library/react';
import AddMatch from './AddMatch';
import {BrowserRouter} from "react-router-dom";

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useParams: () => ({
//         matchId: '1', // Replace with a suitable mock value
//     }),
// }));
//
// jest.mock('../../../services/apiClient', () => ({
//     get: jest.fn(),
//     put: jest.fn(),
// }));
//
// describe('AddMatch Component', () => {
//     beforeEach(() => {
//         // Reset the mock function before each test
//         jest.clearAllMocks();
//     });
//
//     it('renders without crashing', async () => {
//         // Mock the axios get method to return data
//         const axios = require('../../../services/apiClient');
//         axios.get.mockResolvedValueOnce({
//             data: {
//                 data: {
//                     gameDate: '2023-09-15T10:00:00Z',
//                     visitorTeam: 'Team A',
//                     category: 'Category A',
//                     address: '123 Main St/12345/City',
//                 },
//             },
//         });
//
//         const {getByText, queryByText} =
//             render(
//                 <BrowserRouter>
//                     <AddMatch/>
//                 </BrowserRouter>
//             );
//
//         expect(getByText(/chargement/i)).toBeInTheDocument();
//
//         await waitFor(() => {
//             expect(queryByText(/chargement/i)).not.toBeInTheDocument();
//         });
//     });
//
//
//     it('loads match data and displays form', async () => {
//         // Mock the axios get method to return data
//         const axios = require('../../../services/apiClient');
//
//         const data = {
//             gameDate: '2023-09-15T10:00:00Z',
//             visitorTeam: {
//                 name: 'Team A',
//             },
//             category: 'Category A',
//             address: '123 Main St/12345/City',
//         }
//         axios.get.mockResolvedValueOnce({
//             data: {
//                 data,
//             },
//         });
//
//         let getByText, getByDisplayValue;
//
//         await act(async () => {
//             const component = render(
//                 <BrowserRouter>
//                     <AddMatch />
//                 </BrowserRouter>
//             );
//
//             await new Promise((resolve) => setTimeout(resolve, 0));
//
//             getByText = component.getByText;
//             getByDisplayValue = component.getByDisplayValue;
//         });
//
//         expect(getByText('Date du match:')).toBeInTheDocument();
//         expect(getByDisplayValue('123 Main St')).toBeInTheDocument();
//         expect(getByDisplayValue('12345')).toBeInTheDocument();
//         expect(getByDisplayValue('City')).toBeInTheDocument();
//     });
//
// });
