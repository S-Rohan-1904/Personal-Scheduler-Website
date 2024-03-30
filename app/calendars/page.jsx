"use client";

import { useEffect, useContext, useState } from "react";
import GlobalContext from "@/Context/GlobalContext";
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
  const [currentTimetableID, setCurrentTimetableID] = useState("");
  const [timetable, setTimetable] = useState({});
  const [events, setEvents] = useState({});
  const [count, setCount] = useState(0);

  const {
    setIsLoggedin,
    isLoggedin,
    setErrorMessage,
    isError,
    setIsError,
    errorMessage,
  } = useContext(GlobalContext);

  useEffect(() => {
    (async () => {
      // const del = await deleteTimetable("66079b136ced68dd315541c7");
      // console.log(del);
      // const res = await updateTimetable("6607cf236ced68dd31554524", "First tt");
      // console.log(res);
      let timetableData = await fetchAllTimetables();
      setTimetable(timetableData.data);
      console.log(timetableData.data);

      // setCurrentTimetableID(timetableData.data[0]._id);
      // console.log(timetableData.data[0]._id);
      // const create = await createEvent(
      //   "6607cf236ced68dd31554522",
      //   "Oasis",
      //   "2024-04-01",
      //   "2024=04-02"
      // );
      // console.log(create);
      const ev = await fetchAllEvents("6607cf236ced68dd31554524");
      console.log(ev.data);
      setEvents(ev.data);

      if (timetableData?.status == 200) {
        setIsError(false);
        setIsLoggedin(true);
      } else {
        setIsError(true);
        setErrorMessage("Something went wrong!. Please try again");
        console.log("hello");
        setIsLoggedin(false);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const id = timetable[count]?._id;
      if (id != undefined) {
        const eventData = await fetchAllEvents(id);
        console.log(eventData.data);
        setEvents(eventData.data);
      }
    })();
  }, [count]);
  const handle = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <div>
      {isError && <p>{errorMessage}</p>}
      {isLoggedin && timetable.toString() != {}.toString() && (
        <div>
          {/* <select
            name=""
            id=""
            onChange={(e) => setOption(e.target.value)}
            value={option}
          >
            {timetable.map((el, i) => {
              return (
                <option data={el.id} key={i}>
                  {el.name}
                </option>
              );
            })}
          </select> */}
          <button onClick={handle}>Up</button>
          {events.toString() != {}.toString() &&
            events.map((event, i) => {
              return <p key={i}>{event.name}</p>;
            })}
        </div>
      )}
    </div>
  );
}

export default Calendar;
