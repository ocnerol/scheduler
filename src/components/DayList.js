import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const { days, value, onChange } = props;
  const daysParsed = days.map((singleDay) => {
    return (
      <DayListItem
        key={singleDay.id}
        name={singleDay.name}
        spots={singleDay.spots}
        selected={singleDay.name === value}
        setDay={() => onChange(singleDay.name)}
      />
    );
  });

  return <ul> {daysParsed} </ul>;
}
