import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  const interviewersParsed = interviewers.map((singleInterviewer) => {
    return (
      <InterviewerListItem
        key={singleInterviewer.id}
        name={singleInterviewer.name}
        avatar={singleInterviewer.avatar}
        selected={singleInterviewer.id === value}
        setInterviewer={() => onChange(singleInterviewer.id)}
      />
    );
  });
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'> {interviewersParsed} </ul>
    </section>
  );
}
