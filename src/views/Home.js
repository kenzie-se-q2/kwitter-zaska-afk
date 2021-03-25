import React from "react"
import Login from "../components/Login"

function Home(props) {
  return (
    <>
      <div id="title">
        <div id="menu">
          <h1 id="header">Kwitter</h1>
        </div>
        <Login />
      </div>
    </>
  )
}

export default Home
