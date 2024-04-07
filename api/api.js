import axios from "axios";
import Cookies from "js-cookie";
const createTimetable = async (tt_name) => {
  try {
    const res = await axios.post(
      "https://sutt-front-task2-d09a14a7c50b.herokuapp.com/timetables/",
      {
        name: tt_name,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

const fetchAllTimetables = async () => {
  try {
    const res = await axios.get(
      "https://sutt-front-task2-d09a14a7c50b.herokuapp.com/timetables/",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    return res;
  } catch (err) {
    return err;
  }
};

const fetchTimetable = async (tt_id) => {
  try {
    const res = await axios.get(
      `https://sutt-front-task2-d09a14a7c50b.herokuapp.com/timetables/${tt_id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

const updateTimetable = async (tt_id, tt_name) => {
  try {
    const res = await axios.patch(
      `https://sutt-front-task2-d09a14a7c50b.herokuapp.com/timetables/${tt_id}`,
      {
        name: tt_name,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

const deleteTimetable = async (tt_id) => {
  try {
    const res = await axios.delete(
      `https://sutt-front-task2-d09a14a7c50b.herokuapp.com/timetables/${tt_id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

const createEvent = async (tt_id, eventName, startDate, endDate) => {
  try {
    const res = await axios.post(
      `https://sutt-front-task2-d09a14a7c50b.herokuapp.com/timetables/${tt_id}/events/`,
      {
        name: eventName,
        startTime: startDate,
        endTime: endDate,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

const fetchAllEvents = async (tt_id) => {
  try {
    const res = await axios.get(
      `https://sutt-front-task2-d09a14a7c50b.herokuapp.com/timetables/${tt_id}/events/`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

const fetchEvent = async (tt_id, event_id) => {
  try {
    const res = await axios.get(
      `https://sutt-front-task2-d09a14a7c50b.herokuapp.com/timetables/${tt_id}/events/${event_id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

const updateEvent = async (tt_id, event_id, eventName, startDate, endDate) => {
  try {
    const res = await axios.patch(
      `https://sutt-front-task2-d09a14a7c50b.herokuapp.com/timetables/${tt_id}/events/${event_id}`,
      {
        name: eventName,
        startTime: startDate,
        endTime: endDate,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

const deleteEvent = async (tt_id, event_id) => {
  try {
    const res = await axios.delete(
      `https://sutt-front-task2-d09a14a7c50b.herokuapp.com/timetables/${tt_id}/events/${event_id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

export {
  fetchAllEvents,
  fetchEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  deleteTimetable,
  createTimetable,
  updateTimetable,
  fetchTimetable,
};
export default fetchAllTimetables;
