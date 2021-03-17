import { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { useStore, ACTIONS } from "../store/store"

import {
  getMessageList,
  createMessageRequest,
  logoutRequest,
} from "../fetchRequests"

const Messages = () => {
  const messages = useStore((state) => state.messages)
  const user = useStore((state) => state.user)
  const isRedirecting = useStore((state) => state.isRedirecting)
  const dispatch = useStore((state) => state.dispatch)

  const [offset, setOffset] = useState(0)
  const [newMessage, setNewMessage] = useState("")
  const [count, setCount] = useState(0)

  const logout = (e) => {
    logoutRequest(user.token)
      .then(() => dispatch({ type: ACTIONS.LOGOUT }))
      .then(dispatch({ type: ACTIONS.SET_REDIRECTING }))
  }

  useEffect(() => {
    setTimeout(() => {
      getMessageList(15, offset).then((res) =>
        dispatch({
          type: ACTIONS.SET_MESSAGES,
          payload: { messages: res.messages },
        })
      )
    }, 500)
  }, [count])

  const handleChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createMessageRequest(user.token, newMessage)
      .then(setNewMessage(""))
      .then(setCount((count) => (count += 1)))
  }

  return (
    <>
      <div id="logout">
        {user.token && <button onClick={logout}>Logout</button>}
      </div>
      <form id="message-form" onSubmit={handleSubmit}>
        <label htmlFor="message"></label>
        <input
          type="text"
          name="message"
          required
          value={newMessage}
          placeholder="What do you want to say?"
          onChange={handleChange}
        ></input>
        <button type="submit">Post</button>
      </form>
      {!isRedirecting && <Redirect to="/" />}
    </>
  )
}

export default Messages
