import { combineReducers } from "redux";
import MainReducer from "./main";

const RootReducer = combineReducers({
  main: MainReducer
});

export default RootReducer;
