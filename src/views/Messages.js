import { useState } from "react"
import { Redirect } from "react-router-dom"

import { useStore, ACTIONS } from "../store/store"
import { getMessageList, createMessageRequest } from "../fetchRequests"
import NavView from "../components/Header"
import MessageList from "../components/MessageList"
import TopTenList from "../components/TopTenList"

const Messages = (props) => {
  // Get Global state
  const messages = useStore((state) => state.messages)
  const user = useStore((state) => state.user)
  const limit = useStore((state) => state.limit)
  const isRedirecting = useStore((state) => state.isRedirecting)
  const dispatch = useStore((state) => state.dispatch)

  // Declare local state
  const [newMessage, setNewMessage] = useState("")

  const handleChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createMessageRequest(user.token, newMessage)
      .then(setNewMessage(""))
      .then(
        setTimeout(() => {
          getMessageList(limit, 0).then((res) => {
            dispatch({
              type: ACTIONS.SET_MESSAGES,
              payload: { messages: res.messages },
            })
          })
        }, 500)
      )
  }

  const list = props.match.path === "/topten" ? <TopTenList /> : <MessageList />

  return (
    <>
      <NavView />
      <form id="message-form" onSubmit={handleSubmit}>
        <textarea
          type="text"
          required
          value={newMessage}
          placeholder="What do you want to say?"
          onChange={handleChange}
        ></textarea>
        <button type="submit">Post</button>
      </form>
      {messages && list}
      {!isRedirecting && <Redirect to="/" />}
    </>
  )
}

export default Messages
