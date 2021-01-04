import React, { Fragment } from "react";
import spinner from "../assets/spinner.gif";

function Spinner() {
  return (
    <Fragment>
      <img
        src={spinner}
        alt="Loading"
        style={{ width: "60px", margin: "auto", display: "block" }}
      />
    </Fragment>
  );
}
export default Spinner;
