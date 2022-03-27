import React from "react";
import WeatherItem from "../WeatherItem/WeatherItem";

const Weatherelements = ({ weatherData, removeWeatherItem }) => {
  console.log({ weatherData });
  return (
    <>
      {weatherData &&
        weatherData.map((element) => {
          return (
            <WeatherItem
              key={element._id}
              element={element}
              removeWeatherItem={removeWeatherItem}
            />
          );
        })}
    </>
  );
};

export default Weatherelements;
