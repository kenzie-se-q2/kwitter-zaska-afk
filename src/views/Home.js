import React from "react"

import Login from "../components/Login"
import Menu from "../components/Menu"

function Home(props) {
  return (
    <>
      <Menu />
      <h2>Your favorite microblogging platform</h2>
      <Login />
    </>
  )
}

export default Home
