import MessageItem from "../components/MessageItem"
import { useStore } from "../store/store"

const TopTen = () => {
  const messages = useStore((state) => state.messages)

  const sortedMessages = messages.sort((a, b) => {
    if (a.likes.length > b.likes.length) return -1
    if (a.likes.length < b.likes.length) return 1
    return 0
  })

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
