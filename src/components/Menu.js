import React from "react";
import { Link } from "react-router-dom";

import { useStore, ACTIONS } from "../store/store";
import { logoutRequest } from "../fetchRequests";

function Menu(props) {
  const user = useStore((state) => state.user);
  const dispatch = useStore((state) => state.dispatch);

  // Handle Logout
  const logout = (e) => {
    logoutRequest(user.token)
      .then(() => dispatch({ type: ACTIONS.LOGOUT }))
      .then(dispatch({ type: ACTIONS.SET_REDIRECTING }));
  };

  return (
    <div id="menu">
      <h1>Kwitter</h1>
      <div id="menu-links">
        <Link to="/">Home</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/Profile">Profile</Link>
        <div id="logout">
          {user.token && <button onClick={logout}>Logout</button>}
        </div>
      </div>
    </div>
  );
}

export default Menu;
