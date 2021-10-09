import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer, userSignupReducer } from "../reducers/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";

// combining the reducers using combineReducers hook
const reducers = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
});
//Extracting user info  from localstorage if exists so as to prevent losing of redux state upon refreshing
const userPreservedData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
// setting initial state
const initialState = {
  userLogin: { userInfo: userPreservedData },
};
const middleware = [thunk];
// creating redux store
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
