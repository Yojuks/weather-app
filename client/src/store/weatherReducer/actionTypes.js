export const SET_CITY = "SET_CITY";

export const FEATCH_WEATHER = "FEATCH_WEATHER";

export const setCity = (city) => ({ type: FEATCH_WEATHER, payload: city });

export const FETCH_WEATHER_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_WEATHER_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_WEATHER_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const ADD_WEATHER = "ADD_WEATHER";

export const fetchWeatherBegin = () => ({
  type: FETCH_WEATHER_BEGIN,
});

export const fetchhWeatherSuccess = (weather) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: { weather },
});

export const fetchhWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: { error },
});

export const addWeather = (weather) => ({
  type: ADD_WEATHER,
  payload: weather,
});
