import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

import NavView from "../components/Header"
import { useStore, ACTIONS } from "../store/store"
import {
  setPictureRequest,
  getUserRequest,
  updateUserRequest,
  deleteUserRequest,
} from "../fetchRequests"

const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img for="photo-upload" src={src} />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
)

const Name = ({ onChange, value }) => (
  <div className="field">
    <label htmlFor="name">name:</label>
    <input
      id="name"
      type="text"
      onChange={onChange}
      minLength="3"
      maxLength="20"
      value={value}
      required
    />
  </div>
)

const Status = ({ onChange, value }) => (
  <div className="field">
    <label htmlFor="status">status:</label>
    <input
      id="status"
      type="text"
      onChange={onChange}
      maxLength="255"
      value={value}
      required
    />
  </div>
)

const Password = ({ onChange, value }) => (
  <div className="field">
    <label htmlFor="password">Password:</label>
    <input
      id="password"
      type="password"
      onChange={onChange}
      minLength="3"
      maxLength="20"
      value={value}
      required
    />
  </div>
)

const Profile = ({ onSubmit, src, name, status, canEdit, username }) => (
  <>
    <div className="profilecard">
      <h3>{name}'s Profile Page</h3>
      <form onSubmit={onSubmit}>
        <label className="custom-file-upload fas">
          <div className="img-wrap">
            <img
              width="200px"
              for="photo-upload"
              src={src}
              alt={`${username}'s Profile Picture`}
            />
          </div>
        </label>
        <div className="name">{name}</div>
        <div className="username">@{username}</div>
        <div className="status">{status}</div>
        {canEdit && (
          <button type="submit" className="edit">
            Edit Profile{" "}
          </button>
        )}
      </form>
    </div>
  </>
)

const Edit = ({ onSubmit, changeActive, children, handleDelete }) => (
  <div className="profilecard">
    <form onSubmit={onSubmit}>
      {children}
      <button type="submit" className="save">
        Save{" "}
      </button>
      <button onClick={handleDelete}>Delete Account</button>
      <button onClick={changeActive}>Back</button>
    </form>
  </div>
)

function ProfilePage(props) {
  //This is are the states that will take in the information of the user
  const [user, setUser] = useState("")
  const [username, setUsername] = useState("")
  const [userStatus, setUserStatus] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [canEdit, setCanEdit] = useState(false)
  const [formData, setFormData] = useState({
    password: "",
    displayName: "",
    about: "",
  })

  const isRedirecting = useStore((state) => state.isRedirecting)
  const currentUser = useStore((state) => state.user)
  const dispatch = useStore((state) => state.dispatch)

  //this is an example/place holder for now
  //ideally we will run this with props.user etc from props that is passed into the component
  //
  useEffect(() => {
    getUserRequest(props.location.pathname.slice(9)).then((userData) => {
      if (userData.user.username === currentUser.username) {
        setCanEdit(true)
      }

      setUser(userData.user.displayName)
      setUsername(userData.user.username)
      setImageUrl(
        `https://socialapp-api.herokuapp.com${userData.user.pictureLocation}`
      )
      setUserStatus(userData.user.about)
    })
  }, [props.location.pathname])

  //handles the image upload
  function photoUpload(event) {
    const reader = new FileReader()
    const picture = event.target.files[0]
    reader.onloadend = () => {
      if (picture.size <= 200000) {
        setImageUrl(reader.result)
        setPictureRequest(currentUser.username, picture, currentUser.token)
      } else {
        alert("Image cannot be larger than 200KB")
      }
    }
    reader.readAsDataURL(picture)
  }

  //handles the edit of user's name
  function editName(event) {
    const name = event.target.value
    setFormData((data) => {
      return { ...data, displayName: name }
    })
  }

  function editPassword(event) {
    const password = event.target.value
    setFormData((data) => {
      return { ...data, password: password }
    })
  }

  //handles the edit of user status
  function editStatus(event) {
    const status = event.target.value

    setFormData((data) => {
      return { ...data, about: status }
    })
  }

  //handles the submit
  function handleSubmit(event) {
    event.preventDefault()

    updateUserRequest(
      currentUser.username,
      formData.password,
      formData.about,
      formData.displayName,
      currentUser.token
    ).then((userData) => {
      if (userData.statusCode === 200) {
        const data = userData.user

        setUser(data.displayName)
        setUsername(data.username)
        setUserStatus(data.about)
        setImageUrl(
          `https://socialapp-api.herokuapp.com${data.pictureLocation}`
        )

        setFormData({
          password: "",
          displayName: "",
          about: "",
          picture: {},
        })
      }
    })

    setIsActive((isActive) => !isActive)
  }

  function handleDelete(event) {
    deleteUserRequest(currentUser.username, currentUser.token)
      .then(dispatch({ type: ACTIONS.LOGOUT }))
      .then(dispatch({ type: ACTIONS.SET_REDIRECTING }))
  }

  function changeIsActive() {
    setIsActive((isActive) => !isActive)
  }

  //here is where the component's created above will be run passing in the
  //states that we pull from props in useEffect funtion in this component
  return (
    <>
      <NavView />
      <div className="profilebody">
        {isActive ? (
          <Edit
            onSubmit={(event) => handleSubmit(event)}
            changeActive={(event) => changeIsActive(event)}
            handleDelete={(event) => handleDelete(event)}
          >
            <ImgUpload
              onChange={(event) => photoUpload(event)}
              src={imageUrl}
            />
            <Name
              onChange={(event) => editName(event)}
              value={formData.displayName}
            />
            <Password
              onChange={(event) => editPassword(event)}
              value={formData.password}
            />
            <Status
              onChange={(event) => editStatus(event)}
              value={formData.about}
            />
          </Edit>
        ) : (
          <Profile
            onSubmit={(event) => changeIsActive(event)}
            src={imageUrl}
            name={user}
            username={username}
            status={userStatus}
            canEdit={canEdit}
          />
        )}
      </div>
      {!isRedirecting && <Redirect to="/" />}
    </>
  )
}

export default ProfilePage
