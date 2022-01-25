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
    const days = [...state.days]
    for (const day of days) {
      if (day.appointments.includes(appointmentID)) {
        day.spots = (change === 'book' ? day.spots - 1 : day.spots + 1);
        return days;
      }
    }
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(id, 'book');

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

    const appointments = {
      ...state.appointments,
      [id]: appointmentToUpdate,
    };

    const days = updateSpots(id, 'cancel');
    return axios
      .delete(`/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }));
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
