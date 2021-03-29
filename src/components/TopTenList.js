import { useEffect } from "react"

import MessageItem from "../components/MessageItem"
import { useStore, ACTIONS } from "../store/store"
import { getMessageList } from "../fetchRequests"

const TopTenList = () => {
  const messages = useStore((state) => state.messages)
  const dispatch = useStore((state) => state.dispatch)

  const sortedMessages = messages
    .sort((a, b) => {
      if (a.likes.length > b.likes.length) return -1
      if (a.likes.length < b.likes.length) return 1
      return 0
    })
    .slice(0, 10)

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
{/* <!-- ////////////////////////////////////////////////////////////
Personally, I would have just sent message={message} through to MessageItem.
Then, in MessageItem, you could have destructured all of these variables off by doing:
const {likes, text, username, createdAt, id } = props.message
//////////////////////////////////////////////////////////// --> */}
      </ul>
    </div>
  )
}

export default TopTenList
