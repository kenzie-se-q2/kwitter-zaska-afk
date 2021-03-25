import "../assets/messageFeed.css"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { useStore, ACTIONS } from "../store/store"
import LikeButton from "./LikeButton"
import {
  getMessageList,
  getPictureRequest,
  deleteMessageRequest,
} from "../fetchRequests"

import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"

const MessageItem = (props) => {
  const user = useStore((state) => state.user)
  const dispatch = useStore((state) => state.dispatch)
  const limit = useStore((state) => state.limit)

  const [profilePicture, setProfilePicture] = useState()
  const [isUserMessage, setIsUserMessage] = useState(false)

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

  const handleDelete = () => {
    deleteMessageRequest(props.id, user.token)

    setTimeout(() => {
      getMessageList(limit, 0).then((res) => {
        dispatch({
          type: ACTIONS.SET_MESSAGES,
          payload: { messages: res.messages },
        })
      })
    }, 500)
  }

  return (
    <div id="MessageFeed">
      <div id={`message-${props.id}`}>
        <Card style={{ width: "90%", height: "auto" }}>
          <Card.Img variant="top" src={profilePicture && profilePicture.src} />
          <Card.Body>
            <Card.Title>{props.username}</Card.Title>
            <Card.Text>
              <textarea readOnly type="text" value={props.value}></textarea>
              {isUserMessage && (
                <Button onClick={handleDelete}>Delete Message</Button>
              )}
              <LikeButton likes={props.likes} id={props.id} />
            </Card.Text>
            <Link to={`/profile/${props.username}`}>
              <Button>{props.username}'s Profile</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default MessageItem
