import { createContext } from "react";

const userDetails = createContext({
  userDetails: {"displayName":""},
  setUserDetails: (input) => {}
});

export default userDetails;