import { createContext } from "react";

const foodContext = createContext({
  food: {"1":{"food":"", "price":"", "stock":""}},
  setFood: (input) => {}
});

export default foodContext;