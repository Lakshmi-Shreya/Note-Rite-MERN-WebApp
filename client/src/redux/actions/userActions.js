// defining actions and return dispatch function which return action type and payload(optional)
// Login Action creator
export const loginAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: "loginUser",
      payload: data,
    });
  };
};
// Signup Action creator
export const signupAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: "signupUser",
      payload: data,
    });
  };
};
// Logout Action creator
export const logoutAction = () => {
  return (dispatch) => {
    dispatch({ type: "logoutUser" });
  };
};
