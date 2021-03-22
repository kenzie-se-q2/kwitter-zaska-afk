import { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { useStore, ACTIONS } from "../store/store"
import NavView from "./Header"
import MessageList from "./MessageList"
import TopTen from "./TopTen"
import {
  getMessageList,
  createMessageRequest,
  logoutRequest,
} from "../fetchRequests"

const Messages = (props) => {
  // Get Global state
  const messages = useStore((state) => state.messages)
  const user = useStore((state) => state.user)
  const isRedirecting = useStore((state) => state.isRedirecting)
  const dispatch = useStore((state) => state.dispatch)

  // Declare local state
  const [offset, setOffset] = useState(0)
  const [newMessage, setNewMessage] = useState("")
  const [count, setCount] = useState(0)

  // Get a list of the most recent messages
  useEffect(() => {
    setTimeout(() => {
      getMessageList(15, offset).then((res) =>
        dispatch({
          type: ACTIONS.SET_MESSAGES,
          payload: { messages: res.messages },
        })
      )
    }, 500)
    //eslint-disable-next-line
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

  const list = props.match.path === "/topten" ? <TopTen /> : <MessageList />

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
