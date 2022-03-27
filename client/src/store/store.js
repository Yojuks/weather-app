import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { weatherReducer } from "./weatherReducer/weatherReducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const rootReducer = combineReducers({
  weatherData: weatherReducer,
});

let store = createStore(rootReducer, composedEnhancer);

export default store;
