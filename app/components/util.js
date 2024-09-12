import dayjs from "dayjs";

//default parameter(current month)
function getCalendar(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayofTheMonth = dayjs(new Date(year, month, 1)).day();
  //negative because number of days before the first day of the month to be shown in the calendar
  let dayCountOfCurrentMonth = 0 - firstDayofTheMonth;
  // rows-6, cols-7 in calendar
  const calendar = new Array(6).fill([]).map(() => {
    return Array(7)
      .fill(null)
      .map(() => {
        dayCountOfCurrentMonth++;
        return dayjs(new Date(year, month, dayCountOfCurrentMonth));
      });
  });
  return calendar;
}

export default getCalendar;
