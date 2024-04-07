"use client";
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import GlobalContext from "@/Context/GlobalContext";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  createEvent,
  deleteEvent,
  fetchAllEvents,
  updateEvent,
} from "@/api/api";

function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchEvent,
    savedEvents,
    selectedEvent,
    setSelectedEvent,
    timetables,
    currentTimetableIndex,
  } = useContext(GlobalContext);

  const [eventName, setEventName] = useState(
    selectedEvent ? selectedEvent.name : "Demo Event"
  );
  const [startDate, setStartDate] = useState(
    selectedEvent ? dayjs(selectedEvent.startTime) : daySelected
  );
  const [endDate, setEndDate] = useState(
    selectedEvent
      ? dayjs(selectedEvent.endTime)
      : dayjs(new Date(daySelected).getTime() + 60 * 60 * 1000)
  );
  const [isValid, setIsValid] = useState(true);
  const [err, setErrMsg] = useState("");

  const checkIsValid = (start, end, name) => {
    //also check if there is an event in this time
    if (start < end && name != "") setIsValid(true);
    else {
      setErrMsg("Check the Event Name, Date and Time");
      setIsValid(false);
    }
  };
  const startDateChangeHandler = (newStartDate) => {
    setStartDate(newStartDate);
    checkIsValid(newStartDate, endDate, eventName);
  };

  const endDateChangeHandler = (newEndDate) => {
    setEndDate(newEndDate);
    checkIsValid(startDate, newEndDate, eventName);
  };
  const eventNameChangeHandler = (e) => {
    setEventName(e.target.value);
    checkIsValid(startDate, endDate, e.target.value);
  };
  const eventDeleteHandler = () => {
    (async () => {
      const res = await deleteEvent(
        timetables[currentTimetableIndex]?._id,
        selectedEvent._id
      );

      dispatchEvent({ type: "delete", payload: selectedEvent._id });
    })();
    setSelectedEvent(null);
    setShowEventModal(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatchEvent({ type: "create", payload: event });
    // Create event api call
    //handle error of event creation
    let validity = true;

    for (let i = 0; i < savedEvents.length; i++) {
      let event = savedEvents[i];
      console.log(event);
      if (selectedEvent && event._id != selectedEvent._id) {
        if (
          (startDate.toISOString() <= event.startTime &&
            endDate.toISOString() <= event.startTime) ||
          (startDate.toISOString() >= event.endTime &&
            endDate.toISOString() >= event.endTime)
        ) {
          continue;
        } else {
          setErrMsg("There is a clash in the timings with another event");
          validity = false;
          setIsValid(false);
          break;
        }
      } else if (selectedEvent == null) {
        if (
          (startDate.toISOString() <= event.startTime &&
            endDate.toISOString() <= event.startTime) ||
          (startDate.toISOString() >= event.endTime &&
            endDate.toISOString() >= event.endTime)
        ) {
          console.log("h");
          continue;
        } else {
          setErrMsg("There is a clash in the timings with another event");
          validity = false;
          setIsValid(false);
          break;
        }
      }
    }
    if (validity) {
      if (selectedEvent) {
        (async () => {
          const res = await updateEvent(
            timetables[currentTimetableIndex]?._id,
            selectedEvent._id,
            eventName,
            startDate.toISOString(),
            endDate.toISOString()
          );
          console.log(res.data);
          if (res.data) dispatchEvent({ type: "update", payload: res.data });
        })();
      } else {
        (async () => {
          const res = await createEvent(
            timetables[currentTimetableIndex]?._id,
            eventName,
            startDate.toISOString(),
            endDate.toISOString()
          );
          console.log(res.data);
          if (res.data) dispatchEvent({ type: "push", payload: res.data });
        })();
      }

      setShowEventModal(false);
    }
  };
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <div className="bg-gray-100 px-4 py-2 flex justify-end items-center">
          {selectedEvent && (
            <button onClick={eventDeleteHandler}>
              <DeleteIcon />
            </button>
          )}
          <button
            onClick={() => {
              setSelectedEvent(null);
              setShowEventModal(false);
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7"></div>
          <input
            type="text"
            placeholder="Name of Event"
            value={eventName}
            required
            onChange={eventNameChangeHandler}
            className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
          />
        </div>
        <div className="px-3 py-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DemoItem>
                <h3>Start Date</h3>
                <DateTimePicker
                  defaultValue={daySelected}
                  value={startDate}
                  onChange={startDateChangeHandler}
                />
              </DemoItem>
            </DemoContainer>
            <DemoContainer components={["DateTimePicker"]}>
              <DemoItem>
                <h3>End Date</h3>
                <DateTimePicker
                  defaultValue={daySelected}
                  value={endDate}
                  onChange={endDateChangeHandler}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        {isValid ? "" : <h4 className="p-3 text-red-500">{err}</h4>}
        <div className="flex justify-center p-3 mb-3">
          <button
            type="submit"
            onClick={submitHandler}
            disabled={!isValid}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventModal;
