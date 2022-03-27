import React, { useState, useEffect, forseUpdate } from "react";
import axios from "axios";
import Input from "./Components/Input/Input";
import Weatherelements from "./Components/WeatherElements/WeatherElements";
import "./App.css";
import { fetchWeatherData, addTodo } from "./store/weatherReducer/weatherReducer";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

function App() {
  const [city, setCity] = useState("");

  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weatherData.weather);

  console.log(weatherData, "weatherData");

  useEffect(() => {
    getData();
  }, []);

  const addElement = () => {
    try {
      dispatch(fetchWeatherData())
        .then(() => weatherData.find((element) => element.city === city))
        .then((result) => {
          if (result === undefined) {
            dispatch(addTodo(city));
          }
        });
      setCity("");
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    dispatch(fetchWeatherData());
  };

  const removeWeatherItem = async (id) => {
    try {
      await axios
        .delete(
          `/api/weather/delete/${id}`,
          { id },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then(() => getData());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1 className="Title">The weather app</h1>
      <div className="InputAndButton">
        <Input city={city} setCity={setCity} />
        <button className="button" onClick={addElement}>
          add
        </button>
      </div>

      <Weatherelements weatherData={weatherData} removeWeatherItem={removeWeatherItem} />
    </div>
  );
}

export default App;
