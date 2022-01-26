import React from 'react';

import { render } from '@testing-library/react';

import Appointment from 'components/Appointment/index';

// const mockState = {
//   days: [
//     {
//       id: 1,
//       name: 'Monday',
//       appointments: [1, 2, 3],
//       interviewers: [1, 2, 3],
//       spots: 2,
//     },
//     {
//       id: 2,
//       name: 'Tuesday',
//       appointments: [4, 5, 6],
//       interviewers: [1, 2, 3],
//       spots: 0,
//     },
//   ],
//   appointments: {
//     1: {
//       id: 1,
//       time: '12pm',
//       interview: null,
//     },
//     2: {
//       id: 2,
//       time: '1pm',
//       interview: null,
//     },
//     3: {
//       id: 3,
//       time: '2pm',
//       interview: {
//         student: 'Archie Cohen',
//         interviewer: 1,
//       },
//     },
//     4: {
//       id: 4,
//       time: '3pm',
//       interview: {
//         student: 'Chad Takahashi',
//         interviewer: 2,
//       },
//     },
//     5: {
//       id: 5,
//       time: '4pm',
//       interview: {
//         student: 'Jamal Jordan',
//         interviewer: 3,
//       },
//     },
//     6: {
//       id: 6,
//       time: '12pm',
//       interview: {
//         student: 'Leopold Silvers',
//         interviewer: 2,
//       },
//     },
//   },
//   interviewers: {
//     1: {
//       id: 1,
//       name: 'Sylvia Palmer',
//       avatar: 'https://i.imgur.com/LpaY82x.png',
//     },
//     2: {
//       id: 2,
//       name: 'Tori Malcolm',
//       avatar: 'https://i.imgur.com/Nmx0Qxo.png',
//     },
//     3: {
//       id: 3,
//       name: 'Mildred Nazir',
//       avatar: 'https://i.imgur.com/T2WwVfS.png',
//     },
//   },
// };


describe('Appointment', () => {
  it('renders without crashing', () => {
    render(<Appointment />);
  });
});
