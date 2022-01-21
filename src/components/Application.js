import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";

import "components/Application.scss";
import getAppointmentsForDay from "helpers/selectors";

const lastAppointment = <Appointment key="last" time="5pm" />;

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  console.log('state.appointments ->', state.appointments)
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState(Object.assign({}, state, { day: day }))
  // const setDays = days => setState(Object.assign({}, state, { days: days }))
  // const setDays = days => setState(prev => ({...prev, days }));

  useEffect(() => {
    const getDays = axios.get('/api/days');
    const getAppointments = axios.get('/api/appointments');
    const promises = [getDays, getAppointments];
    
    Promise.all(promises)
    .then(resolvedArray => {
      const [first, second] = resolvedArray;
      const days = first.data;
      const appointments = second.data;

      setState(prev => ({...prev, days, appointments}));

    })
    .catch(error => console.log(error));
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay}/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { dailyAppointments.map(appointment => (
          <Appointment
          key={appointment.id}
          {...appointment}
          />
        )).concat([lastAppointment]) }
      </section>
    </main>
  );
}
