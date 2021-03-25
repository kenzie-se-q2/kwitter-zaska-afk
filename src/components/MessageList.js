import { useEffect } from "react"
import MessageItem from "../components/MessageItem"
import { useStore, ACTIONS } from "../store/store"
import { getMessageList } from "../fetchRequests"

const MessageList = () => {
  const messages = useStore((state) => state.messages)
  const limit = useStore((state) => state.limit)
  const dispatch = useStore((state) => state.dispatch)

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_LIMIT, payload: { limit: 15 } })

    getMessageList(limit, 0).then((res) =>
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
