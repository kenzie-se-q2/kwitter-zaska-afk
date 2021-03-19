import MessageItem from "../components/MessageItem"
import { useStore } from "../store/store"

const MessageList = () => {
  const messages = useStore((state) => state.messages)

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
