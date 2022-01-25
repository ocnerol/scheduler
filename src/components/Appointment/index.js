import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = "SAVING";

export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview, id, cancelAppointment } = props;
  const initialMode = interview ? SHOW : EMPTY;
  const { mode, transition, back } = useVisualMode(initialMode);

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((err) => console.log(err));
  };

  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={cancelAppointment}
        />
      )}
      {mode === SAVING && <Status message={SAVING}/>}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
    </article>
  );
}
