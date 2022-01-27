import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'Saving';
const DELETING = 'Deleting';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_DELETE =
  'There was an error deleting your appointment. Please try again.';
const ERROR_SAVE =
  'There was an error saving your appointment. Please try again';

export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview, id, cancelInterview } =
    props;
  const initialMode = interview ? SHOW : EMPTY;
  const { mode, transition, back } = useVisualMode(initialMode);

  const save = (name, interviewer, edit) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    bookInterview(id, interview, mode === EDIT) // got mode === EDIT idea from @bparry
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
  };

  const onDelete = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  };

  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          student={interview.student}
          interviewer={interview.interviewer.id}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm
          message={'Are you sure you would like to delete?'}
          onCancel={() => back()}
          onConfirm={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message={ERROR_DELETE} onClose={() => back()} />
      )}
      {mode === ERROR_SAVE && (
        <Error message={ERROR_SAVE} onClose={() => back()} />
      )}
    </article>
  );
}
