// import "../assets/messageFeed.css"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"

import { useState, useEffect } from "react"

import { useStore, ACTIONS } from "../store/store"
import {
  addLikeRequest,
  removeLikeRequest,
  getMessageList,
} from "../fetchRequests"

const LikeButton = (props) => {
  const [buttonName, setButtonName] = useState("Like")
  const [isFirstRender, setIsFirstRender] = useState(true)

  const messages = useStore((state) => state.messages)
  const user = useStore((state) => state.user)
  const limit = useStore((state) => state.limit)
  const dispatch = useStore((state) => state.dispatch)

  // Set button name when first loading
  useEffect(() => {
    const likeObj = props.likes.filter(
      (like) => like.username === user.username
    )[0]

    if (likeObj && isFirstRender) {
      setButtonName("Remove Like")
      setIsFirstRender(false)
    }
  })

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
      getMessageList(limit, 0).then((res) => {
        dispatch({
          type: ACTIONS.SET_MESSAGES,
          payload: { messages: res.messages },
        })
      })
    }, 700)
  }

  return (
    <>
      <Card.Text>Number of Likes: {props.likes.length}</Card.Text>
      <Button onClick={handleClick}>{buttonName}</Button>
    </>
  )
}

export default LikeButton
