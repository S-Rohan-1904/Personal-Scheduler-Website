"use client";
import React from "react";
import dayjs from "dayjs";
const GlobalContext = React.createContext({
  isLoggedin: false,
  setIsLoggedin: () => {},
  isError: false,
  setIsError: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonthIndex: 0,
  setSmallCalendarMonthInex: (index) => {},
  daySelected: dayjs(),
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  savedEvents: [],
  dispatchEvent: ({ type, payload }) => {},
  selectedEvent: null,
  setSelectedEvent: () => {},
  timetables: [],
  dispatchTimetable: ({ type, payload }) => {},
  currentTimetableIndex: 0,
  setCurrentTimetableIndex: () => {},
});

export default GlobalContext;
