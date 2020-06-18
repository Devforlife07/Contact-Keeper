import React from "react";
import spinner from "./spinner.gif";
const Spinner = () => {
  console.log(spinner);
  return (
    <>
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </>
  );
};
export default Spinner;
