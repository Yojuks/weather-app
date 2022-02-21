import React from "react";
import { v1 } from "uuid";
import WeatherItem from "../WeatherItem/WeatherItem";

const Weatherelements = ({ weatherItems, removeWeatherItem }) => {
  return (
    <>
      {weatherItems &&
        weatherItems.map((element) => {
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
