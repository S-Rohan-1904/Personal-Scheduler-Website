"use client";
import React, { useState, useEffect, useReducer } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

const savedEventsReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      if (JSON.stringify(state) != JSON.stringify([payload])) {
        // to make it a single array of object
        return state.flat().concat(payload);
      }
    case "update":
      return state.map((event) =>
        event?._id == payload?._id ? payload : event
      );
    case "delete":
      return state.filter((event) => event?._id != payload);
    case "write":
      return payload;
    default:
      console.log("error");
  }
};

const timetableReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      if (state && !state?.includes(payload)) {
        return [...state, payload];
      }
    case "update":
      return state.map((timetable) =>
        timetable?._id == payload?._id ? payload : timetable
      );
    case "delete":
      return state.filter((timetable) => timetable?._id != payload);
    case "write":
      return payload;
    default:
      console.log("Enter a correct option");
  }
};

function ContextWrapper(props) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [monthIndex, setMonthIndex] = useState(null);
  const [smallCalendarMonthIndex, setSmallCalendarMonthIndex] = useState(
    dayjs().month()
  );
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [timetables, dispatchTimetable] = useReducer(timetableReducer, []);
  const [currentTimetableIndex, setCurrentTimetableIndex] = useState(0);
  const [savedEvents, dispatchEvent] = useReducer(savedEventsReducer, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedin,
        setIsLoggedin,
        isError,
        setIsError,
        errorMessage,
        setErrorMessage,
        monthIndex,
        setMonthIndex,
        smallCalendarMonthIndex,
        setSmallCalendarMonthIndex,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        savedEvents,
        dispatchEvent,
        selectedEvent,
        setSelectedEvent,
        timetables,
        dispatchTimetable,
        currentTimetableIndex,
        setCurrentTimetableIndex,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default ContextWrapper;
