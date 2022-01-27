import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const updateSpots = (appointmentID, change) => {
    // change argument is a string; either 'book' or 'cancel'; determines whether to increment/decrement spots
    const days = [...state.days];
    for (const day of days) {
      if (day.appointments.includes(appointmentID)) {
        const dayCopy = { ...day };
        dayCopy.spots =
          change === 'book' ? dayCopy.spots - 1 : dayCopy.spots + 1;
        days[days.indexOf(day)] = dayCopy;
        return days;
      }
    }
  };

  const bookInterview = (id, interview, edit) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = edit ? [...state.days] : updateSpots(id, 'book');

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((res) => setState((prev) => ({ ...prev, appointments, days })));
  };

  const cancelInterview = (id) => {
    const appointmentToUpdate = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointmentToUpdate,
    };

    const days = updateSpots(id, 'cancel');
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }));
  };

  const setDay = (day) => setState(Object.assign({}, state, { day: day }));

  useEffect(() => {
    const getDays = axios.get('/api/days');
    const getAppointments = axios.get('/api/appointments');
    const getInterviewers = axios.get('/api/interviewers');
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
