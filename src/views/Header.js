import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import { useStore, ACTIONS } from "../store/store";
import { logoutRequest } from "../fetchRequests";
import { Link } from "react-router-dom";

function NavView(props) {
  const user = useStore((state) => state.user);
  const dispatch = useStore((state) => state.dispatch);

  // Handle Logout
  const logout = (e) => {
    logoutRequest(user.token)
      .then(() => dispatch({ type: ACTIONS.LOGOUT }))
      .then(dispatch({ type: ACTIONS.SET_REDIRECTING }));
  };

  return (
    <>
      <Navbar fixed="top" />
      <Navbar bg="dark" variant="dark" />

      <button onClick={logout}>Logout</button>

      <Link to={`/profile/${user.username}`}>
        <button>Profile</button>
      </Link>
      <Link to="/messages">
        <button>Message Board</button>
      </Link>
      <Link to="/topten">
        <button>Top Posts</button>
      </Link>
    </>
  );
}

export default NavView;
