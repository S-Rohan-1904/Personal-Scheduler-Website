"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Plus from "../../public/plus.svg";
import GlobalContext from "@/Context/GlobalContext";
function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
      onClick={() => setShowEventModal(true)}
    >
      <Image src={Plus} width={30} alt="Create Event" />
      <span className="pl-3 pr-7">Create Event</span>
    </button>
  );
}

export default CreateEventButton;
