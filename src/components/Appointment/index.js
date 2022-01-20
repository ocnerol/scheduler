import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const { time } = props;
  return (
  <article className="appointment">
    { time ? `Appointment at ${time}` : `No Appointments`}
  </article>
  );
}