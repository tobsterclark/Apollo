import { createContext } from "react";

const InputInfo = createContext({
  input: {"email":"", "password":"", "phone":"", "name":""},
  setInput: (input) => {}
});

export default InputInfo;