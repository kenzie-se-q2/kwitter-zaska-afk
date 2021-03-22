import { Nav, Navbar, NavLink } from "react-bootstrap"
import { useStore, ACTIONS } from "../store/store"
import { logoutRequest } from "../fetchRequests"
import { Link } from "react-router-dom"

function NavView(props) {
  const user = useStore((state) => state.user)
  const dispatch = useStore((state) => state.dispatch)

  // Handle Logout
  const logout = (e) => {
    logoutRequest(user.token)
      .then(() => dispatch({ type: ACTIONS.LOGOUT }))
      .then(dispatch({ type: ACTIONS.SET_REDIRECTING }))
  }

  return (
    <>
      <Navbar fixed="top" />
      <Navbar bg="dark" variant="dark" />
      <NavLink href="#home">Home</NavLink>
      <NavLink href="#settings">Settings</NavLink>
      <NavLink href="#Profile">Profile</NavLink>

      <button onClick={logout}>Logout</button>

      <Link to="/Profile">
        <button>Profile</button>
      </Link>
      <Link to="/topten">
        <button>Top Posts</button>
      </Link>
    </>
  )
}

export default NavView
