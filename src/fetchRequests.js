const baseURL = "https://kwitter-api-b.herokuapp.com/"

export const loginRequest = (username, password) => {
  return fetch(baseURL + "auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json())
}

export const logoutRequest = (token) => {
  return fetch(baseURL + "auth/logout", {
    headers: { Authorization: "Bearer " + token },
  }).then((res) => res.json())
}

export const createUserRequest = (username, password, displayName) => {
  return fetch(baseURL + "users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      displayName,
      password,
    }),
  }).then((res) => res.json())
}

//to search for another user's profile information
export const getUserRequest = (username) => {
  return fetch(baseURL + `users/${username}`).then((res) => res.json())
}

//settings component to update user's information
export const updateUserRequest = (
  username,
  password,
  about,
  displayName,
  token
) => {
  return fetch(baseURL + `users/${username}`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      about,
      displayName,
    }),
  }).then((res) => res.json())
}

//settings component
export const deleteUserRequest = (username, token) => {
  return fetch(baseURL + `users/${username}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  }).then((res) => res.json())
}

//looking at another user's profile and in message component
export const getPictureRequest = (username) => {
  return fetch(baseURL + `users/${username}/picture`).then((res) => res.blob())
}

/* Unused request for setting profile picture */

export const setPictureRequest = (username, picture, token) => {
  const formData = new FormData()
  formData.append("file", picture)

  return fetch(baseURL + `users/${username}/picture`, {
    method: "PUT",
    header: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  })
}

export const createMessageRequest = (token, text) => {
  return fetch(baseURL + "messages", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  }).then((res) => res.json())
}

//looking at another user's profile
export const getUserMessageList = (limit, offset, username) => {
  return fetch(
    `${baseURL}messages?limit=${limit}&offset=${offset}&username=${username}`
  ).then((res) => res.json())
}

export const getMessageList = (limit, offset) => {
  return fetch(
    `${baseURL}messages?limit=${limit}&offset=${offset}`
  ).then((res) => res.json())
}

//can be in settings or for messages you have posted
export const deleteMessageRequest = (messageId, token) => {
  return fetch(`${baseURL}messages/${messageId}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  }).then((res) => res.json())
}

export const addLikeRequest = (messageId, token) => {
  return fetch(baseURL + "likes", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messageId,
    }),
  })
}

export const removeLikeRequest = (likeId, token) => {
  return fetch(baseURL + `likes/${likeId}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  }).then((res) => res.json())
}
