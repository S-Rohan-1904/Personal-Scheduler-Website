"use client";
import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import GlobalContext from "@/Context/GlobalContext";

function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      className="border p-4 rounded-full flex items-center shadow-md "
      onClick={() => setShowEventModal(true)}
    >
      <span className="cursor-pointer text-gray-600 ">
        <AddIcon />
      </span>
      <span className="pl-3 pr-7">Create Event</span>
    </button>
  );
}

export default CreateEventButton;
