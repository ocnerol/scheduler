import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";


export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": (spots === 0),
  });

  const clickHandler = () => setDay(name);
  const formatSpots = () => {
    if (spots === 0) {
      return "no spots";
    } else if (spots === 1) {
      return "1 spot";
    } else {
      return `${spots} spots`;
    }
  }

  return (
    <li onClick={clickHandler} className={dayClass}>
      <h2 className="text--regular">{ name }</h2>
      <h3 className="text--light">{ formatSpots() } remaining</h3>
    </li>
  );
}