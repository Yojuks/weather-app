import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

// import { v1 as uuid } from "uuid";
import { v1 } from "uuid";

function App() {
  const [city, setCity] = useState("");
  const [weatherItems, setWeatherItems] = useState([]);
  const [weather, setWeather] = useState("");

  const changeHandle = (event) => {
    setCity(event.target.value);
    console.log(city);
  };

  const addElement = async () => {
    try {
      if (city !== "") {
        await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6d8309305eeab8655e9b0c4ed74f5b9e`
        )
          .then((response) => response.json())
          .then((result) => {
            setWeather(result);
            setCity("");
            setWeatherItems((prevState) => [
              ...prevState,
              {
                name: result.name,
                temp: result.main.temp,
                feels_like: result.main.feels_like,
                id: v1(),
                icon: result.weather[0].icon,
                description: result.weather[0].description,
              },
            ]);
          });
      }

      await axios.post(
        "/api/weather/add",
        { weather: weather },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {console.log(weather, "weather")}
      <h1 style={{ textAlign: "center" }}>The weather app</h1>
      <div style={{ textAlign: "center" }}>
        <input type="text" value={city} onChange={(e) => changeHandle(e)} />
        <button onClick={addElement}>add</button>
      </div>

      {weatherItems &&
        weatherItems.map((element) => {
          return (
            <div
              key={element.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "5px",
                width: "300px",
                backgroundColor: "grey",
                margin: "0 auto",
                border: "2px solid black",
                marginBottom: "5px",
                borderRadius: "10px",
                marginTop: "5px",
              }}
            >
              <img
                src={`http://openweathermap.org/img/w/${element.icon}.png`}
                alt={`${element.description}`}
                style={{ width: "50px" }}
              />
              <div> {`${element.name}`}</div>
              <div> {`${element.temp}`}</div>
              <div> {`${element.feels_like}`}</div>
              <div> {`${element.description}`}</div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
