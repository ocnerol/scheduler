import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Form from 'components/Appointment/Form';

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

afterEach(cleanup);

describe('Form', () => {
  const interviewers = [
    {
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png',
    },
  ];
  it('renders without crashing', () => {
    render(<Form interviewers={interviewers} />);
  });

  it('renders without student name if not provided', () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  it('renders with initial student name', () => {
    const { getByTestId } = render(
      <Form student={'Lydia Miller-Jones'} interviewers={interviewers} />
    );
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });

  it('validates that the student name is not blank', () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('can successfully save after trying to submit an empty student name', () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(<Form interviewers={interviewers} onSave={onSave} />);

    fireEvent.click(getByText('Save'));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    const input = getByPlaceholderText('Enter Student Name');
    fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });

    fireEvent.click(getByText('Save'));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', null);
  });

  it.only("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
