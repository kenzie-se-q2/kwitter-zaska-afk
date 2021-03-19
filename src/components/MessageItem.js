// TODO: create a MessageItem component which displays 1 message
import { useState, useEffect } from "react"

import { useStore, ACTIONS } from "../store/store"
import {
  addLikeRequest,
  removeLikeRequest,
  getMessageList,
} from "../fetchRequests"

const MessageItem = (props) => {
  const user = useStore((state) => state.user)
  const messages = useStore((state) => state.messages)
  const dispatch = useStore((state) => state.dispatch)

  const [buttonName, setButtonName] = useState("Like")

  useEffect(() => {
    const likeObj = props.likes.filter(
      (like) => like.username === user.username
    )[0]

    if (likeObj) {
      setButtonName("Remove Like")
    }
    // eslint-disable-next-line
  }, [])

  const handleClick = () => {
    if (buttonName === "Like") {
      const messageId = props.id
      addLikeRequest(messageId, user.token).then(setButtonName("Remove Like"))
    } else {
      const messageObj = messages.filter(
        (message) => message.id === props.id
      )[0]

      const likeId = messageObj.likes.filter(
        (like) => like.username === user.username
      )[0].id

      removeLikeRequest(likeId, user.token).then(setButtonName("Like"))
    }

    setTimeout(() => {
      getMessageList(15, 0).then((res) => {
        dispatch({
          type: ACTIONS.SET_MESSAGES,
          payload: { messages: res.messages },
        })
      })
    }, 700)
  }

  return (
    <div id={`message-${props.id}`}>
      <textarea readOnly type="text">
        {props.value}
      </textarea>
      <p>Number of Likes: {props.likes.length}</p>
      <button onClick={handleClick}>{buttonName}</button>
    </div>
  )
}

export default MessageItem
