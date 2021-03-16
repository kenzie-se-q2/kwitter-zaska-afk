const baseURL = "https://socialapp-api.herokuapp.com/"

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
    header: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      displayName,
      password,
    }),
  }).then((res) => res.json())
}

export const getUserRequest = (username) => {
  return fetch(baseURL + `users/${username}`).then((res) => res.json())
}

export const updateUserRequest = (
  username,
  password,
  about,
  displayName,
  token
) => {
  return fetch(baseURL + `users/${username}`, {
    method: "PATCH",
    header: {
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

export const deleteUserRequest = (username, token) => {
  return fetch(baseURL + `users/${username}`, {
    method: "DELETE",
    header: { Authorization: "Bearer " + token },
  }).then((res) => res.json())
}

export const getPictureRequest = (username) => {
  return fetch(baseURL + `users/${username}/picture`).then((res) => res.blob())
}

/* Unused request for setting profile picture */

// export const setPictureRequest = (username, picture, token) => {
//   return fetch(baseURL + `users/${username}/picture`, {
//     method: 'PUT',
//     header: {
//       Authorization: "Bearer " + token,
//       "Content-Type": "multipart/form-data"
//   },
//   body: JSON.stringify({

//   })
//   })
// }

export const createMessageRequest = (token, message) => {
  return fetch(baseURL + "messages", {
    method: "POST",
    header: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  }).then((res) => res.json())
}

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

export const deleteMessageRequest = (messageId, token) => {
  return fetch(`${baseURL}messages/${messageId}`, {
    method: "DELETE",
    header: { Authorization: "Bearer " + token },
  }).then((res) => res.json())
}

export const addLikeRequest = (messageId, token) => {
  return fetch(baseURL + "likes", {
    method: "POST",
    header: {
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
    header: { Authorization: "Bearer " + token },
  }).then((res) => res.json())
}
