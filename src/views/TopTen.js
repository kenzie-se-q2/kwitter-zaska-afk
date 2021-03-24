import { useEffect } from "react"
import MessageItem from "../components/MessageItem"
import { useStore, ACTIONS } from "../store/store"
import { getMessageList } from "../fetchRequests"

const TopTen = () => {
  const messages = useStore((state) => state.messages)
  const dispatch = useStore((state) => state.dispatch)

  const sortedMessages = messages.sort((a, b) => {
    if (a.likes.length > b.likes.length) return -1
    if (a.likes.length < b.likes.length) return 1
    return 0
  })

  useEffect(() => {
    setTimeout(() => {
      getMessageList(10, 0).then((res) =>
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

export default TopTen
