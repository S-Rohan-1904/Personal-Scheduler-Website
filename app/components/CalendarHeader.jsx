"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import GlobalContext from "@/Context/GlobalContext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import dayjs from "dayjs";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import fetchAllTimetables, {
  createTimetable,
  updateTimetable,
  deleteTimetable,
} from "@/api/api";

function CalendarHeader() {
  const {
    monthIndex,
    setMonthIndex,
    timetables,
    dispatchTimetable,
    currentTimetableIndex,
    setCurrentTimetableIndex,
    setIsError,
    setErrorMessage,
  } = useContext(GlobalContext);
  const innerTextRef = useRef(null);
  const [timetableName, setTimetableName] = useState("");
  const router = useRouter();

  const handlePrevMonth = () => {
    setMonthIndex((prevState) => prevState - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex((prevState) => prevState + 1);
  };
  const nextTimetableHandler = () => {
    if (currentTimetableIndex == timetables.length - 1)
      setCurrentTimetableIndex(0);
    else setCurrentTimetableIndex((prevState) => prevState + 1);
  };
  const prevTimetableHandler = () => {
    if (currentTimetableIndex == 0)
      setCurrentTimetableIndex(timetables.length - 1);
    else setCurrentTimetableIndex((prevState) => prevState - 1);
  };

  const blurHandler = (e) => {
    (async () => {
      if (
        JSON.stringify(
          timetables.filter(
            (timetable) =>
              timetable &&
              timetable.name == e.target.innerText &&
              timetable._id != timetables[currentTimetableIndex]._id
          )
        ) == JSON.stringify([])
      ) {
        setIsError(false);
        setErrorMessage("");
        const res = await updateTimetable(
          timetables[currentTimetableIndex]._id,
          e.target.innerText
        );
        if (res) {
          dispatchTimetable({ type: "update", payload: res.data });
          setTimetableName(e.target.innerText);
        }
      } else {
        setIsError(true);
        setErrorMessage(`Timetable ${e.target.innerText} already exists`);

        innerTextRef.current.innerText = timetables[currentTimetableIndex].name;
      }
    })();
  };
  const handleReset = () => {
    //because useEffect of small calendar doesn't recognize change when the monthIndex is same hence we add a decimal value and use floor in get calendar
    setMonthIndex(
      monthIndex == dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };
  const createTimetableHandler = () => {
    (async () => {
      if (
        JSON.stringify(
          timetables.filter(
            (timetable) =>
              timetable && timetable.name == `Demo ${timetables.length + 1}`
          )
        ) == JSON.stringify([])
      ) {
        setIsError(false);
        setErrorMessage("");
        const res = await createTimetable(`Demo ${timetables.length + 1}`);
        if (res) {
          setCurrentTimetableIndex(timetables.length);

          dispatchTimetable({ type: "push", payload: res.data });
        }
      } else {
        setIsError(true);
        setErrorMessage(
          `Timetable Demo ${timetables.length + 1} already exists`
        );
      }
    })();
  };
  const timetableDeleteHandler = () => {
    (async () => {
      if (timetables.length == 1) {
        setIsError(true);
        setErrorMessage("Only one Timetable exists. It can't be deleted");
      } else {
        const res = await deleteTimetable(
          timetables[currentTimetableIndex]?._id
        );
        if (res) {
          if (currentTimetableIndex != 0)
            setCurrentTimetableIndex(currentTimetableIndex - 1);
          else {
            setCurrentTimetableIndex(0);
          }

          dispatchTimetable({
            type: "delete",
            payload: timetables[currentTimetableIndex]?._id,
          });
        }
      }
    })();
  };
  const logoutHandler = () => {
    Cookies.set("token", "");
    router.push("/");
  };
  useEffect(() => {
    (async () => {
      const tt = await fetchAllTimetables();
      dispatchTimetable({ type: "write", payload: tt.data });

      if (JSON.stringify(tt.data) == JSON.stringify([])) {
        const res = await createTimetable("Demo 1");
        if (res) dispatchTimetable({ type: "write", payload: res.data });
      } else {
      }
    })();
  }, []);

  return (
    <div className="px-4 py-2 flex justify-between gap-x-16 items-center  w-screen">
      <div className="flex justify-baseline items-center px-5">
        <button className="border rounded py-2 px-4 " onClick={handleReset}>
          Today
        </button>

        <button onClick={handlePrevMonth}>
          <span>
            <ChevronLeftIcon className="cursor-pointer text-gray-600 mx-2" />
          </span>
        </button>
        {/* if month index is >11 it will move on to the next year */}
        <h2>
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
        <button onClick={handleNextMonth}>
          <span className="cursor-pointer text-gray-600 mx-2">
            <ChevronRightIcon />
          </span>
        </button>
      </div>
      <div className="flex mx-12">
        <button onClick={prevTimetableHandler}>
          <span>
            <ChevronLeftIcon className="cursor-pointer text-gray-600 mx-2" />
          </span>
        </button>

        <p
          className="outline-none"
          onBlur={blurHandler}
          contentEditable={true}
          ref={innerTextRef}
        >
          {timetables ? timetables[currentTimetableIndex]?.name : ""}
        </p>

        <button onClick={nextTimetableHandler}>
          <span className="cursor-pointer text-gray-600 mx-2">
            <ChevronRightIcon />
          </span>
        </button>
      </div>
      <div className="mx-10">
        <button onClick={createTimetableHandler}>
          <span className="cursor-pointer text-gray-600 mx-2">
            <AddIcon />
          </span>
        </button>
        <button onClick={timetableDeleteHandler}>
          <span className="cursor-pointer text-gray-600">
            <DeleteIcon />
          </span>
        </button>

        <button
          onClick={logoutHandler}
          className="bg-red-500 hover:bg-red-600 ml-5 px-3 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default CalendarHeader;
