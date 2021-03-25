import create from "zustand"
import { devtools, redux } from "zustand/middleware"

// define the store's initial state
const initialState = {
  user: { token: "" },
  messages: [],
  limit: 15,
  isRedirecting: false,
}

// set action types
export const ACTIONS = {
  LOGOUT: "LOGOUT",
  LOGIN: "LOGIN",
  SET_MESSAGES: "SET_MESSAGES",
  SET_REDIRECTING: "SET_REDIRECTING",
  SET_LIMIT: "SET_LIMIT",
  ADD_LIKE: "ADD_LIKE",
  REMOVE_LIKE: "REMOVE_LIKE",
}

// define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        user: {
          username: action.payload.username,
          token: action.payload.token,
        },
      }
    case ACTIONS.LOGOUT:
      return { ...state, user: {} }
    case ACTIONS.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages,
      }
    case ACTIONS.SET_REDIRECTING:
      return { ...state, isRedirecting: !state.isRedirecting }
    case ACTIONS.SET_LIMIT:
      return { ...state, limit: action.payload.limit }
    case ACTIONS.ADD_LIKE:
      console.log(action.payload)
      return { ...state, likes: [...state.likes, action.payload.like] }
    case ACTIONS.REMOVE_LIKE:
      return { ...state, likes: action.payload.likes }
    default:
      return state
  }
}

// create useStore hook
export const useStore = create(devtools(redux(reducer, initialState)))
