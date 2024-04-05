"use client";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "@/Context/GlobalContext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import dayjs from "dayjs";
import Image from "next/image";
import Logo from "../../public/logo.png";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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
  } = useContext(GlobalContext);
  const [timetableName, setTimetableName] = useState("");
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
    console.log(timetables[currentTimetableIndex]._id, e.target.innerText);
    (async () => {
      if (
        JSON.stringify(
          timetables.filter(
            (timetable) => timetable && timetable.name == e.target.innerText
          )
        ) == JSON.stringify([])
      ) {
        const res = await updateTimetable(
          timetables[currentTimetableIndex]._id,
          e.target.innerText
        );
        dispatchTimetable({ type: "update", payload: res.data });
        setTimetableName(e.target.innerText);
      } else {
        setTimetableName((prevState) => prevState);
      }
    })();
  };
  const handleReset = () => {
    //because useEffect of small calendar doesn't recognize change when the index is same hence we add a decimal value and use floor in get calendar
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
        await createTimetable(`Demo ${timetables.length + 1}`)
          .then((res) => {
            setCurrentTimetableIndex(timetables.length);
            console.log(res);
            dispatchTimetable({ type: "push", payload: res.data });
          })
          .catch((err) => console.log(err));
      }
    })();
  };
  const timetableDeleteHandler = () => {
    (async () => {
      await deleteTimetable(timetables[currentTimetableIndex]?._id)
        .then((res) => {
          if (currentTimetableIndex != 0)
            setCurrentTimetableIndex(currentTimetableIndex - 1);
          else {
            setCurrentTimetableIndex(0);
          }
          console.log(res);
          dispatchTimetable({
            type: "delete",
            payload: timetables[currentTimetableIndex]?._id,
          });
        })
        .catch((err) => console.log(err));
    })();
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
  // useEffect(() => {
  //   (async () => {
  //     const tt = await fetchAllTimetables();
  //     console.log(tt.data);
  //     if (JSON.stringify(tt.data) == JSON.stringify([])) {
  //       // console.log(tt.data);
  //       const res = await createTimetable("Demo");
  //       console.log(res.data);

  //       if (res.data != undefined)
  //         dispatchTimetable({ type: "push", payload: [res.data] });
  //     } else {
  //       setTimetableName(tt.data[0].name);
  //       // console.log(tt.data[0].name);
  //       if (!tt.data.includes(undefined))
  //         dispatchTimetable({ type: "push", payload: [tt.data] });
  //     }
  //   })();
  // }, []);
  return (
    <header className="px-4 py-2 flex items-center">
      <Image src={Logo} width={25} height={25} alt="Picture of the author" />

      <button className="border rounded py-2 px-4 mr-5" onClick={handleReset}>
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span>
          <ChevronLeftIcon className="cursor-pointer text-gray-600 mx-2" />
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <ChevronRightIcon />
        </span>
      </button>
      {/* if month index is >11 it will move on to the next year */}
      <h2>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>
      <div className="flex ml-10">
        <button onClick={prevTimetableHandler}>
          <span>
            <ChevronLeftIcon className="cursor-pointer text-gray-600 mx-2" />
          </span>
        </button>

        <p className="outline-none" onBlur={blurHandler} contentEditable={true}>
          {timetables ? timetables[currentTimetableIndex]?.name : ""}
        </p>

        <button onClick={nextTimetableHandler}>
          <span className="cursor-pointer text-gray-600 mx-2">
            <ChevronRightIcon />
          </span>
        </button>
      </div>
      <button onClick={createTimetableHandler}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <AddIcon />
        </span>
      </button>
      <button
        onClick={timetableDeleteHandler}
        disabled={timetables?.length == 1}
      >
        <span className="cursor-pointer text-gray-600 mx-2">
          <DeleteIcon />
        </span>
      </button>
    </header>
  );
}

export default CalendarHeader;
