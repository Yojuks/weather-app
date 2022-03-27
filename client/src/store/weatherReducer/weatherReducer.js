import axios from "axios";
import {
  FETCH_WEATHER_BEGIN,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
  ADD_WEATHER,
  fetchWeatherBegin,
  fetchhWeatherSuccess,
  fetchhWeatherFailure,
  addWeather,
} from "./actionTypes";

export const initialState = {
  weather: [],
  loading: false,
  error: null,
};

export function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_WEATHER_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        weather: action.payload.weather,
      };

    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        weather: {},
      };
    case ADD_WEATHER:
      console.log(action.payload, "action.payload");
      return {
        ...state,
        weather: [...state.weather, action.payload],
      };
    default:
      return state;
  }
}

export function fetchWeatherData() {
  return (dispatch) => {
    dispatch(fetchWeatherBegin());
    return fetch("/api/weather/")
      .then(handleErrors)
      .then((res) => res.json())
      .then((weatherList) => {
        dispatch(fetchhWeatherSuccess(weatherList));
        return weatherList;
      })
      .catch((error) => dispatch(fetchhWeatherFailure(error)));
  };
}

// TODO how to rewrite this function
export const addTodo = (city) => (dispatch) => {
  axios
    .post(
      "/api/weather/add",
      { city: city },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .then((res) => {
      dispatch(addWeather(res));
    })
    .catch((e) => console.log(e));
};

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
