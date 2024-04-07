"use client";
import React from "react";
import { useEffect, useContext, useState } from "react";
import GlobalContext from "@/Context/GlobalContext";
//components
import getCalendar from "../components/util";
import CalendarHeader from "../components/CalendarHeader";
import Sidebar from "../components/Sidebar";
import Month from "../components/Month";
import EventModal from "../components/EventModal";
import Link from "next/link";
import ErrorModal from "../components/ErrorModal";
import fetchAllTimetables, {
  fetchAllEvents,
  fetchEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  deleteTimetable,
  createTimetable,
  updateTimetable,
  fetchTimetable,
} from "@/api/api";
function Calendar() {
  const [currentMonthCalendar, setCurrentMonthCalendar] = useState(
    getCalendar()
  );

  const {
    isLoggedin,
    monthIndex,
    showEventModal,
    dispatchEvent,
    isError,
    currentTimetableIndex,
  } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonthCalendar(getCalendar(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    (async () => {
      try {
        const tt = await fetchAllTimetables();
        if (tt) {
          const res = await fetchAllEvents(
            tt?.data[currentTimetableIndex]?._id
          );
          dispatchEvent({ type: "write", payload: res.data ? res.data : [] });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [currentTimetableIndex]);

  return (
    <React.Fragment>
      {isError && <ErrorModal />}
      {isLoggedin ? (
        <>
          {showEventModal && <EventModal />}
          <div className="h-screen flex flex-col">
            <CalendarHeader />
            <div className="flex flex-1">
              <Sidebar />
              <Month month={currentMonthCalendar} />
            </div>
          </div>
        </>
      ) : (
        <Link href="/">Click Here to Login</Link>
      )}
    </React.Fragment>
  );
}

export default Calendar;
