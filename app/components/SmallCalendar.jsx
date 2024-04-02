"use client";
import dayjs from "dayjs";
import React, { useEffect, useState, useContext } from "react";
import GlobalContext from "@/Context/GlobalContext";
import getCalendar from "./util";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function SmallCalendar() {
  //local state to desyncronize it with the big calendar
  const [
    currentMonthIndexOfSmallCalendar,
    setcurrentMonthIndexOfSmallCalendar,
  ] = useState(dayjs().month());
  const [smallCalendar, setSmallCalendar] = useState(getCalendar());
  useEffect(() => {
    setSmallCalendar(getCalendar(currentMonthIndexOfSmallCalendar));
  }, [currentMonthIndexOfSmallCalendar]);

  const {
    monthIndex,
    setMonthIndex,
    smallCalendarMonthIndex,
    setSmallCalendarMonthIndex,
    daySelected,
    setDaySelected,
  } = useContext(GlobalContext);
  // to sync small calendar with big calendar if we change the big calendar month(month index)
  useEffect(() => {
    setcurrentMonthIndexOfSmallCalendar(monthIndex);
  }, [monthIndex]);
  const handlePrevMonth = () => {
    setcurrentMonthIndexOfSmallCalendar((prevState) => prevState - 1);
  };
  const handleNextMonth = () => {
    setcurrentMonthIndexOfSmallCalendar((prevState) => prevState + 1);
  };
  useEffect(() => {
    if (smallCalendarMonthIndex != null) setMonthIndex(smallCalendarMonthIndex);
  }, [smallCalendarMonthIndex]);
  const getDayClass = (day) => {
    const nowDay = dayjs().format("DD-MM-YY");
    const currDay = day.format("DD-MM-YY");
    const selectedDay = daySelected && daySelected.format("DD-MM-YY");
    if (nowDay == currDay) return "bg-blue-500 rounded-full text-white";
    else if (currDay == selectedDay)
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    else return "";
  };
  return (
    <div className="mt-9">
      <header className="flex justify-between pb-3">
        <p className="text-gray-500 font-bold mr-2">
          {dayjs(
            new Date(dayjs().year(), currentMonthIndexOfSmallCalendar)
          ).format("MMMM YYYY")}
        </p>
        {/* div is to prevent it from moving */}
        <div>
          <button onClick={handlePrevMonth}>
            <span>
              <ChevronLeftIcon className="cursor-pointer text-gray-600 mx-1" />
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="cursor-pointer text-gray-600 mx-1">
              <ChevronRightIcon />
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-7">
        {smallCalendar[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {/* to get the first character of day */}
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {smallCalendar.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, j) => (
              <button
                key={j}
                className={`py-0.5 w-full text-center ${getDayClass(day)}`}
                onClick={() => {
                  setSmallCalendarMonthIndex(currentMonthIndexOfSmallCalendar);
                  setDaySelected(day);
                }}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SmallCalendar;
