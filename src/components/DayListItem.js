import React from "react";

export default function DayListItem(props) {
  let { name, spots, selected, setDay } = props;
  const clickHandler = () => setDay(name);
  return (
    <li onClick={clickHandler}>
      <h2 className="text--regular">{ name }</h2>
      <h3 className="text--light">{ spots } spots remaining</h3>
    </li>
  );
}