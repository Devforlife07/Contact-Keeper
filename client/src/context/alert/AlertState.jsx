import React, { useReducer } from "react";
import AlertContext from "./AlertContext.jsx";
import AlertReducer from "./AlertReducer.jsx";
import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../Types";
import Axios from "axios";
const AlertState = (props) => {
  const initialState = [];
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Set Alert
  const setAlert = (message, type) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { message, type, id },
    });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {" "}
      {props.children}{" "}
    </AlertContext.Provider>
  );
};
export default AlertState;
