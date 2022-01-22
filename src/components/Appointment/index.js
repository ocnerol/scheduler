import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";

const EMPTY ="EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
  const { time, interview } = props;
  const initialMode = interview ? SHOW : EMPTY;
  const {mode} = useVisualMode(initialMode);
  return (
  <article className="appointment">
    <Header time={time}/>
    { interview ? <Show student={interview.student} interviewer={interview.interviewer.name} /> : <Empty />}
  </article>
  );
}