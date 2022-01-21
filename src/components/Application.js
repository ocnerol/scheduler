import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";

import "components/Application.scss";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

const lastAppointment = <Appointment key="last" time="5pm" />;

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments
    .map((appointment) => {
      const interview = getInterview(state, appointment.interview);

      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
        />
      );
    })
    .concat(lastAppointment);

  const setDay = (day) => setState(Object.assign({}, state, { day: day }));
  // const setDays = days => setState(Object.assign({}, state, { days: days }))
  // const setDays = days => setState(prev => ({...prev, days }));

  useEffect(() => {
    const getDays = axios.get("/days");
    const getAppointments = axios.get("/appointments");
    const getInterviewers = axios.get("/interviewers");
    const promises = [getDays, getAppointments, getInterviewers];

    Promise.all(promises)
      .then((resolvedArray) => {
        const [first, second, third] = resolvedArray;
        const days = first.data;
        const appointments = second.data;
        const interviewers = third.data;
        console.log(interviewers);

        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      })
      .catch((error) => console.log(error));
  }, []);

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}</section>
    </main>
  );
}
