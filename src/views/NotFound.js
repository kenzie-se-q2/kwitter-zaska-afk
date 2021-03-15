import React from "react";
import { Link } from "react-router-dom";

function NotFound(props) {
  return (
    <>
      <p>Page not found for {props.location.pathname}</p>
      <Link to="/">Go Home</Link>
    </>
  );
}

export default NotFound;
