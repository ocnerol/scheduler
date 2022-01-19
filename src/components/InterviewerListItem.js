import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  const clickHandler = () => setInterviewer(id);

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={interviewerClass} onClick={clickHandler}>
      <img className="interviewers__item--image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
