import { createContext } from "react";

const currentTicket = createContext({
  ticketDetails: {"movieID":"", "time":"", "seating":"", "food":false, "foodOption":"", "foodTime":""},
  setTicketDetails: (input) => {}
});

export default currentTicket;