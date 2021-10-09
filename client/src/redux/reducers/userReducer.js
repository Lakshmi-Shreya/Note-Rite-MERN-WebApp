// Reducers are functions that set up state in redux and take two inputs(state,action)
// reducers takes the dispatched action and upon type it returns the value of modified state

//Login Reducer state
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "loginUser":
      return { userInfo: action.payload };
    case "logoutUser":
      return {};
    default:
      return state;
  }
};
// Signup reducer state
export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case "signupUser":
      return { userInfo: action.payload };
    case "logoutUser":
      return {};
    default:
      return state;
  }
};
