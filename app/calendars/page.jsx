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
  ); // stores the calendar of the current month

  // const [currentTimetableID, setCurrentTimetableID] = useState("");
  // const [timetable, setTimetable] = useState({});
  // const [events, setEvents] = useState({});
  // const [count, setCount] = useState(0);

  const {
    setIsLoggedin,
    isLoggedin,
    setErrorMessage,
    isError,
    setIsError,
    errorMessage,
    monthIndex,
    showEventModal,
    dispatchEvent,
    savedEvents,
  } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonthCalendar(getCalendar(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    //populateWithInitialEvents
    (async () => {
      const res = await fetchAllEvents("660b0cc4383cbd4dbb088e2f");
      dispatchEvent({ type: "push", payload: res.data ? res.data : [] });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      //     // const del = await deleteTimetable("66079b136ced68dd315541c7");
      //     // console.log(del);
      //     // const res = await updateTimetable("6607cf236ced68dd31554524", "First tt");
      //     // console.log(res);
      //     let timetableData = await fetchAllTimetables();
      //     setTimetable(timetableData.data);
      //     console.log(timetableData.data);
      //     // setCurrentTimetableID(timetableData.data[0]._id);
      //     // console.log(timetableData.data[0]._id);
      // const create = await createEvent(
      //   "6607cf236ced68dd31554524",
      //   "Apogee",
      //   "2024-04-03T00:21:29+05:30",
      //   "2024-04-04T00:21:29+05:30"
      // );
      // console.log(create);
      // const ev = await fetchAllEvents("6607cf236ced68dd31554524");
      // console.log(ev.data);
      //     setEvents(ev.data);
      //     if (timetableData?.status == 200) {
      //       setIsError(false);
      //       setIsLoggedin(true);
      //     } else {
      //       setIsError(true);
      //       setErrorMessage("Something went wrong!. Please try again");
      //       console.log("hello");
      //       setIsLoggedin(false);
      //     }
    })();
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     const id = timetable[count]?._id;
  //     if (id != undefined) {
  //       const eventData = await fetchAllEvents(id);
  //       console.log(eventData.data);
  //       setEvents(eventData.data);
  //     }
  //   })();
  // }, [count]);
  // const handle = () => {
  //   setCount((prevCount) => prevCount + 1);
  // };
  return (
    <React.Fragment>
      {isError && <p>{errorMessage}</p>}
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
