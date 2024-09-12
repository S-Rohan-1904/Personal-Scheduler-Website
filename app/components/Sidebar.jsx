import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
function Sidebar() {
  return (
    <div className="border p-5 w-64">
      <CreateEventButton />
      <SmallCalendar />
    </div>
  );
}

export default Sidebar;
