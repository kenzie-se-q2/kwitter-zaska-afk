// TODO: create a MessageItem component which displays 1 message
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useStore, ACTIONS } from "../store/store"
import {
  addLikeRequest,
  removeLikeRequest,
  getMessageList,
  getPictureRequest,
  deleteMessageRequest,
} from "../fetchRequests"

const MessageItem = (props) => {
  const user = useStore((state) => state.user)
  const messages = useStore((state) => state.messages)
  const dispatch = useStore((state) => state.dispatch)

  const [buttonName, setButtonName] = useState("Like")
  const [isfirstRender, setIsFirstRender] = useState(true)
  const [profilePicture, setProfilePicture] = useState()
  const [isUserMessage, setIsUserMessage] = useState(false)

  // Set button name when first loading
  useEffect(() => {
    const likeObj = props.likes.filter(
      (like) => like.username === user.username
    )[0]

    if (likeObj && isfirstRender) {
      setButtonName("Remove Like")
      setIsFirstRender(false)
    }
  })

  useEffect(() => {
    getPictureRequest(props.username).then((picture) => {
      if (
        picture.type === "image/jpeg" ||
        picture.type === "image/png" ||
        picture.type === "image/gif"
      ) {
        const pictureURL = URL.createObjectURL(picture)
        picture.src = pictureURL
        return setProfilePicture(picture)
      }
    })

    if (props.username === user.username) {
      setIsUserMessage(true)
    }
  }, [])

  // Handle like button
  const handleClick = () => {
    // When Liking a post
    if (buttonName === "Like") {
      const messageId = props.id
      addLikeRequest(messageId, user.token).then(setButtonName("Remove Like"))
      // When removing a like from a post
    } else {
      const messageObj = messages.filter(
        (message) => message.id === props.id
      )[0]

      const likeId = messageObj.likes.filter(
        (like) => like.username === user.username
      )[0].id

      removeLikeRequest(likeId, user.token).then(setButtonName("Like"))
    }

    // Get updated messages
    setTimeout(() => {
      getMessageList(15, 0).then((res) => {
        dispatch({
          type: ACTIONS.SET_MESSAGES,
          payload: { messages: res.messages },
        })
      })
    }, 500)
  }

  const handleDelete = () => {
    deleteMessageRequest(props.id, user.token)

    setTimeout(() => {
      getMessageList(15, 0).then((res) => {
        dispatch({
          type: ACTIONS.SET_MESSAGES,
          payload: { messages: res.messages },
        })
      })
    }, 500)
  }

  return (
    <div id={`message-${props.id}`}>
      <Link to={`/profile/${props.username}`}>
        <img src={profilePicture && profilePicture.src} />
        {props.username}
      </Link>
      <textarea readOnly type="text">
        {props.value}
      </textarea>
      {isUserMessage && <button onClick={handleDelete}>Delete Message</button>}
      <p>Number of Likes: {props.likes.length}</p>
      <button onClick={handleClick}>{buttonName}</button>
    </div>
  )
}

export default MessageItem
