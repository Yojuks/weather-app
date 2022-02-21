import "./App.css";
import React, { useState, useCallback, useEffect, forseUpdate } from "react";
import axios from "axios";
import Input from "./Components/Input/Input";
import Weatherelements from "./Components/WeatherElements/WeatherElements";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherItems, setWeatherItems] = useState([]);
  const [weather, setWeather] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const addElement = async () => {
    try {
      await getData()
        .then(() => weatherItems.find((element) => element.city === city))
        .then((result) => {
          if (result === undefined) {
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
              .then(() => getData());
          }
        });
      setCity("");
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    await axios.get("/api/weather/").then((result) => {
      setWeather(result);
      setCity("");
      setWeatherItems((prevState) => [...result?.data]);
    });
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

      <Weatherelements weatherItems={weatherItems} removeWeatherItem={removeWeatherItem} />
    </div>
  );
}

export default App;
