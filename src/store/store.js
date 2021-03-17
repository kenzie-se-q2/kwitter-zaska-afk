import create from "zustand"
import { devtools, redux } from "zustand/middleware"

// define the store's initial state
const initialState = { user: { token: "" }, messages: [] }

// set action types
export const ACTIONS = {
  LOGOUT: "LOGOUT",
  LOGIN: "LOGIN",
}

// define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return { user: action.payload }
    case ACTIONS.LOGOUT:
      return { user: {} }
    default:
      return state
  }
}

// create useStore hook
export const useStore = create(devtools(redux(reducer, initialState)))
