"use client";
import React, { useState, useEffect, useReducer } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { fetchAllEvents } from "@/api/api";

const savedEventsReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      if (JSON.stringify(state) != JSON.stringify([payload])) {
        // to make it a single array of object
        return state.flat().concat(payload);
      }
    case "update":
      return state.map((event) => (event._id == payload._id ? payload : event));
    case "delete":
      return state.filter((event) => event._id != payload);
    default:
      console.log("error");
  }
};

function ContextWrapper(props) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [monthIndex, setMonthIndex] = useState(null);
  const [smallCalendarMonthIndex, setSmallCalendarMonthIndex] = useState(
    dayjs().month()
  );
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [savedEvents, dispatchEvent] = useReducer(savedEventsReducer, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedin,
        setIsLoggedin,
        isError,
        setIsError,
        user,
        setUser,
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
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default ContextWrapper;
