import React from "react";
import styles from "./Input.module.css";

const Input = ({ city, setCity }) => {
  const changeHandle = (event) => {
    setCity(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
  };

  return (
    <>
      <input
        className={styles.input}
        type="text"
        value={city}
        onChange={(e) => changeHandle(e)}
        placeholder="enter city"
      />
    </>
  );
};

export default Input;
