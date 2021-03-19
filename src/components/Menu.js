import React from "react"

function Menu(props) {
  return (
    <div id="menu">
      <h1>Kwitter</h1>
      <div id="menu-links">
        <Link to="/">Home</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/Profile">Profile</Link>
        {user.token && <button onClick={logout}>Logout</button>}
      </div>
    </div>
  )
}

export default Menu
