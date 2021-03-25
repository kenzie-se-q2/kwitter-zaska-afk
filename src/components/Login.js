import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"
import { loginRequest } from "../fetchRequests"

import { ACTIONS, useStore } from "../store/store"
import "../assets/homepage.css"

function Login() {
  const dispatch = useStore((state) => state.dispatch)
  const isRedirecting = useStore((state) => state.isRedirecting)

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  const handleMessage = (e) => {
    if (e.data.username !== undefined) {
      dispatch({ type: ACTIONS.LOGIN, payload: e.data })
      dispatch({ type: ACTIONS.SET_REDIRECTING })
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    loginRequest(formData.username, formData.password)
      // If the request turned out ok
      .then((userData) => {
        if (userData.message === undefined) {
          return dispatch({ type: ACTIONS.LOGIN, payload: userData })
        } else {
          alert(userData.message)
          return false
        }
      })
      .then((value) => {
        if (value) {
          dispatch({ type: ACTIONS.SET_REDIRECTING })
        }
      })
  }

  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setFormData((state) => ({ ...state, [inputName]: inputValue }))
  }

  const handleClick = (e) => {
    window.open("https://socialapp-api.herokuapp.com/auth/google/login")
  }

  return (
    <>
      <div id="login">
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
          <button onClick={handleClick}>Login in with Google</button>

          <p>
            Don't have an account? Sign up <Link to="/register">here!</Link>
          </p>
        </form>
        {isRedirecting && <Redirect to="/messages" />}
      </div>
    </>
  )
}

export default Login
