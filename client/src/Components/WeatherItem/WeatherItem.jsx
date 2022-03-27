import React from "react";
import styles from "./Weather.module.css";

const WeatherItem = ({ element, removeWeatherItem }) => {
  const remove = (id) => {
    removeWeatherItem(id);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <img
            src={`http://openweathermap.org/img/w/${element?.icon}.png`}
            alt={`${element.description}`}
            style={{ width: "50px" }}
          />
        </div>

        <div className={styles.text_elements}>
          <div> {`${element.city}`} </div>
          <div> {`${(+element.temperature).toFixed(1)}°C`} </div>
          <div> {`${element.description}`} </div>
        </div>
        <div
          className={styles.deleteSymbol}
          onClick={() => remove(element?._id)}
          style={{ color: "black" }}
        ></div>
      </div>
    </>
  );
};

export default WeatherItem;
