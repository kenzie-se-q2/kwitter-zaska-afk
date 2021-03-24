import { useEffect } from "react"
import MessageItem from "../components/MessageItem"
import { useStore, ACTIONS } from "../store/store"
import { getMessageList } from "../fetchRequests"
// import "MessageFeed.css";

const MessageList = () => {
  const messages = useStore((state) => state.messages)
  const dispatch = useStore((state) => state.dispatch)

  useEffect(() => {
    setTimeout(() => {
      getMessageList(15, 0).then((res) =>
        dispatch({
          type: ACTIONS.SET_MESSAGES,
          payload: { messages: res.messages },
        })
      )
    }, 500)
  }, [])

  return (
    <div id="messages">
      <ul>
        {messages &&
          messages.map((message) => (
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
