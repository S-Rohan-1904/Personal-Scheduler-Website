import React from "react";
import Day from "./Day";
function Month({ month }) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-6">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, j) => {
            return <Day day={day} key={j} rowIndex={i} />;
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Month;
