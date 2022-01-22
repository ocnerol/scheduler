export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;

  let foundAppointments = [];
  for (const singleDay of days) {
    if (singleDay.name === day) {
      foundAppointments = [...singleDay.appointments];
    }
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

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;

  let foundInterviewers = [];
  for (const singleDay of days) {
    if (singleDay.name === day) {
      foundInterviewers = [...singleDay.interviewers];
    }
  }

  foundInterviewers = foundInterviewers.map((index) => interviewers[index]);
  return foundInterviewers;
}
