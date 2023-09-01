import USER_ACTION_TYPES from "./user.types";

export const USER_INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS: {
      return { ...state, currentUser: null };
    }
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};

// #########################################################################

// using redux toolkit now

// import { createSlice } from "@reduxjs/toolkit";

// export const USER_INITIAL_STATE = {
//   currentUser: null,
//   isLoading: false,
//   error: null,
// };


// export const userSlice = createSlice({
//   name:"user",
//   initialState: USER_INITIAL_STATE,
//   reducers: {
//     setCurrentUser(state,action){
//       state.currentUser = action.payload // this looks like mutable but under the hood it is immutable redux-toolkit using the library called [imre] which is responsible to show its looks like mutation  
//     }
//   }
// })

// export const {setCurrentUser} = userSlice.actions

// export const userReducer = userSlice.reducer