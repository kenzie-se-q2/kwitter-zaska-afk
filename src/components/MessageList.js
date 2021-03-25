import { useEffect } from "react"
import MessageItem from "../components/MessageItem"
import { useStore, ACTIONS } from "../store/store"
import { getMessageList } from "../fetchRequests"

const MessageList = () => {
  const messages = useStore((state) => state.messages)
  const dispatch = useStore((state) => state.dispatch)

  const sortedMessages = messages.slice(0, 15)

  useEffect(() => {
    getMessageList().then((res) =>
      dispatch({
        type: ACTIONS.SET_MESSAGES,
        payload: { messages: res.messages },
      })
    )
  }, [])

  return (
    <div id="messages">
      <ul>
        {messages &&
          sortedMessages.map((message) => (
            <MessageItem
              value={message.text}
              username={message.username}
              likes={message.likes}
              id={message.id}
              key={message.id}
            />
          ))}
      </ul>
    </div>
  )
}

export default MessageList
