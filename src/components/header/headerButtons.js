import React from "react";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export const HeaderButtons = (props) => {
  let history = useHistory();
  return (
    <div>
      <button onClick={() => history.push("/")}>Home</button>
      {/* <Link to="/">Home</Link> */}
      <button onClick={() => history.push("/public")}>Public</button>
      <button onClick={() => history.push("/private")}>Private</button>
    </div>
  );
};