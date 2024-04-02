import React, { useContext } from "react";
import GlobalContext from "@/Context/GlobalContext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import dayjs from "dayjs";
import Image from "next/image";
import Logo from "../../public/logo.png";

function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const handlePrevMonth = () => {
    setMonthIndex((prevState) => prevState - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex((prevState) => prevState + 1);
  };
  const handleReset = () => {
    //because useEffect of small calendar doesn't recognize change when the index is same hence we add a decimal value and use floor in get calendar
    setMonthIndex(
      monthIndex == dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };
  return (
    <header className="px-4 py-2 flex items-center">
      <Image src={Logo} width={25} height={25} alt="Picture of the author" />
      <h1 className="mr-10 text-xl text-gray-500 font-bold">
        Personal Scheduler App
      </h1>
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
    </header>
  );
}

export default CalendarHeader;
