import React from 'react';

import { render, cleanup } from '@testing-library/react';

import Form from 'components/Appointment/Form';

const mockState = {
  days: [
    {
      id: 1,
      name: 'Monday',
      appointments: [1, 2, 3],
      interviewers: [1, 2, 3],
      spots: 2,
    },
    {
      id: 2,
      name: 'Tuesday',
      appointments: [4, 5, 6],
      interviewers: [1, 2, 3],
      spots: 0,
    },
  ],
  appointments: {
    1: {
      id: 1,
      time: '12pm',
      interview: null,
    },
    2: {
      id: 2,
      time: '1pm',
      interview: null,
    },
    3: {
      id: 3,
      time: '2pm',
      interview: {
        student: 'Archie Cohen',
        interviewer: 1,
      },
    },
    4: {
      id: 4,
      time: '3pm',
      interview: {
        student: 'Chad Takahashi',
        interviewer: 2,
      },
    },
    5: {
      id: 5,
      time: '4pm',
      interview: {
        student: 'Jamal Jordan',
        interviewer: 3,
      },
    },
    6: {
      id: 6,
      time: '12pm',
      interview: {
        student: 'Leopold Silvers',
        interviewer: 2,
      },
    },
  },
  interviewers: {
    1: {
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png',
    },
    2: {
      id: 2,
      name: 'Tori Malcolm',
      avatar: 'https://i.imgur.com/Nmx0Qxo.png',
    },
    3: {
      id: 3,
      name: 'Mildred Nazir',
      avatar: 'https://i.imgur.com/T2WwVfS.png',
    },
  },
};

afterEach(cleanup);

describe('Form', () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  it('renders without crashing', () => {
    render(<Form interviewers={interviewers}/>);
  })

  it('renders without student name if not provided', () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers}/>);
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(<Form student={"Lydia Miller-Jones"} interviewers={interviewers}/>);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
});
