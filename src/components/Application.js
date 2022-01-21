import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointment";

import "components/Application.scss";

const lastAppointment = <Appointment key="last" time="5pm" />;

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  useEffect(() => {
    axios.get('/api/days')
    .then(response => setDays(response.data))
    .catch(error => console.log(error))
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
          <DayList days={days} value={day} onChange={setDay}/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { appointments.map(appointment => (
          <Appointment
          key={appointment.id}
          {...appointment}
          />
        )).concat([lastAppointment]) }
      </section>
    </main>
  );
}
