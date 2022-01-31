import { createContext } from "react";

const timeslots = createContext({
  timeslots: {"1":{"date":"", "movie":"", "seating":""}},
  setTimeslots: (input) => {}
});

export default timeslots;