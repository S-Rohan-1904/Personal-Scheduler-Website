"use client";
import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "@/Context/GlobalContext";
function Day({ day, rowIndex }) {
  const [dayEvents, setDayEvents] = useState([]);
  const { setShowEventModal, setDaySelected, savedEvents, setSelectedEvent } =
    useContext(GlobalContext);
  const getCurrentDayClass = () => {
    // if day is current day
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  };
  useEffect(() => {
    // filter logic should work for multiple day spanning events
    let events = savedEvents.filter((event) => {
      const temp = day;
      // console.log(dayjs(new Date(event.startTime)).format());
      const [a, b] = temp.format().split("T");
      const [c, d] = dayjs(new Date(event.startTime)).format().split("T");
      const [e, f] = dayjs(new Date(event.endTime)).format().split("T");
      // console.log(day, event.startTime, event.endTime);
      return c <= a && a <= e;
      // console.log(day.format().slice(i));
    });
    function removeDuplicates(array) {
      const seen = {};
      return array.filter((item) => {
        const keyValue = item._id;
        if (!seen.hasOwnProperty(keyValue)) {
          seen[keyValue] = true;
          return true;
        }
        return false;
      });
    }
    events = removeDuplicates(events);
    setDayEvents(events);
  }, [savedEvents, day]);
  return (
    <div className="border border-gray-200 flex flex-col">
      <div className="flex flex-col items-center">
        {/* to show the day only in first row */}
        {rowIndex == 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </div>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((event, i) => (
          <div
            key={i}
            onClick={() => setSelectedEvent(event)}
            className="bg-blue-500 p-1 mr-3 my-3 text-gray-600 text-sm rounded mb-1 trumcate"
          >
            {event.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Day;
