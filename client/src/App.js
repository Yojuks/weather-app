import "./App.css";
import React, { useState, useCallback, useEffect, forseUpdate } from "react";
import axios from "axios";

// import { v1 as uuid } from "uuid";
import { v1 } from "uuid";

function App() {
  const [city, setCity] = useState("");
  const [weatherItems, setWeatherItems] = useState([]);
  const [weather, setWeather] = useState("");

  const changeHandle = (event) => {
    setCity(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
  };

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

  const removeTodo = async (id) => {
    console.log(id, "id");
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
                src={`http://openweathermap.org/img/w/${element?.icon}.png`}
                alt={`${element?.description}`}
                style={{ width: "50px" }}
              />
              <div> {`${element?.city}`}</div>
              <div> {`${element?.temperature}`}</div>
              <div> {`${element?.description}`}</div>

              <span onClick={() => removeTodo(element?._id)} style={{ color: "black" }}>
                x
              </span>
            </div>
          );
        })}
    </div>
  );
}

export default App;
