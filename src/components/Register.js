import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { createUserRequest } from "../fetchRequests"

import { ACTIONS, useStore } from "../store/store"

const Register = (props) => {
  const dispatch = useStore((state) => state.dispatch)

  const [isRedirecting, setIsRedirecting] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    password: "",
  })

  const handleLogin = (e) => {
    e.preventDefault()
    createUserRequest(
      formData.username,
      formData.password,
      formData.displayName
    )
      .then((res) => console.log(res))
      .then((userData) => dispatch({ type: ACTIONS.LOGIN, payload: userData }))
      .then(setIsRedirecting((isRedirecting) => !isRedirecting))
  }

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
        {isRedirecting && <Redirect to="/" />}
      </p>
    </>
  )
}

export default Register
