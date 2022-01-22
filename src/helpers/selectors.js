export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;

  let foundAppointments = [];
  for (const singleDay of days) {
    if (singleDay.name === day) {
      foundAppointments = [...singleDay.appointments];
    }
  }
  // if no appointments found for given day
  if (foundAppointments.length === 0) {
    return [];
  }

  foundAppointments = foundAppointments.map((index) => appointments[index]);
  return foundAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  const result = {
    student: interview.student,
    interviewer,
  };

  return result;
}

// return an array of interviewers (objects) available for the given day
export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;

  let foundInterviewers = [];
  for (const singleDay of days) {
    if (singleDay.name === day) {
      foundInterviewers = [...singleDay.interviewers];
    }
  }
  // if no interviewers found for given day
  if (foundInterviewers.length === 0) {
    return [];
  }

  foundInterviewers = foundInterviewers.map((index) => interviewers[index]);
  return foundInterviewers;
}
