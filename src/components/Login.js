import React, { useState } from "react"
import { Link } from "react-router-dom"
import { loginRequest } from "../fetchRequests"

import { ACTIONS, useStore } from "../store/store"

function Login(props) {
  const dispatch = useStore((state) => state.dispatch)

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleLogin = (e) => {
    e.preventDefault()
    loginRequest(formData.username, formData.password).then((userData) =>
      dispatch({ type: ACTIONS.LOGIN, payload: userData })
    )
  }

  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setFormData((state) => ({ ...state, [inputName]: inputValue }))
  }

  return (
    <>
      <form id="login-form" onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          autoFocus
          required
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          required
          onChange={handleChange}
        />
        <button type="submit">Login</button>

        <p>
          Don't hava an account? Sign up <Link to="/register">here!</Link>
        </p>
      </form>
    </>
  )
}

export default Login
