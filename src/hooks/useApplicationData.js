import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // update state.days
    // for each day, check if day.appointments[id] (if the appointment belongs to that day)
    // if it does, then update state.days.spots to decrease by 1 (booking a new appt)
    const days = [...state.days]

    for (const day of days) {
      if (day.appointments.includes(id)) {
        day.spots = day.spots - 1;
        break;
      }
    }
    

    // in .then you want to pass updates state days
    return axios
      .put(`appointments/${id}`, appointment)
      .then((res) => setState(prev => ({ ...prev, appointments, days })));
    // .catch((err) => console.log(err));
  };

  const cancelInterview = (id) => {
    const appointmentToUpdate = {
      ...state.appointments[id],
      interview: null,
    };

    const updatedAppointmentsObj = {
      ...state.appointments,
      [id]: appointmentToUpdate,
    };

    return axios
      .delete(`/appointments/${id}`)
      .then(() => setState({ ...state, updatedAppointmentsObj }));
    // .catch((err) => err);
  };

  const setDay = (day) => setState(Object.assign({}, state, { day: day }));

  useEffect(() => {
    const getDays = axios.get('/days');
    const getAppointments = axios.get('/appointments');
    const getInterviewers = axios.get('/interviewers');
    const promises = [getDays, getAppointments, getInterviewers];

    Promise.all(promises)
      .then((resolvedArray) => {
        const [first, second, third] = resolvedArray;
        const days = first.data;
        const appointments = second.data;
        const interviewers = third.data;

        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      })
      .catch((error) => console.log(error));
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
