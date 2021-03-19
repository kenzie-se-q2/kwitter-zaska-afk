import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { createUserRequest, loginRequest } from "../fetchRequests"

import { ACTIONS, useStore } from "../store/store"

const Register = (props) => {
  const dispatch = useStore((state) => state.dispatch)
  const isRedirecting = useStore((state) => state.isRedirecting)

  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    password: "",
  })

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault()
    // Create new user using form inputs
    createUserRequest(
      formData.username,
      formData.password,
      formData.displayName
    )
      .then(loginRequest(formData.username, formData.password))
      .then((userData) => {
        if (userData.message === undefined) {
          dispatch({ type: ACTIONS.LOGIN, payload: userData })
        } else {
          alert(userData.message)
          return false
        }
      })
      // If everything worked out well, redirect to the main page
      .then((value) => {
        if (value) {
          return dispatch({ type: ACTIONS.SET_REDIRECTING })
        }
      })
  }

  // Handle change in form
  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setFormData((state) => ({ ...state, [inputName]: inputValue }))
  }

  return (
    <>
      <form id="signup-form" onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          autoFocus
          required
          onChange={handleChange}
        />
        <label htmlFor="displayName">Display Name</label>
        <input
          type="text"
          name="displayName"
          value={formData.displayName}
          required
          onChange={handleChange}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          required
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? Login <Link to="/">here!</Link>
        {/* Redirect to main page when signed in */}
        {isRedirecting && <Redirect to="/" />}
      </p>
    </>
  )
}

export default Register
