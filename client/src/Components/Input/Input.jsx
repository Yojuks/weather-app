import React, { useState } from "react";

const Input = () => {
  const [city, setCity] = useState("");

  const changeHandle = (event) => {
    setCity(event.target.value);
    console.log(city);
  };

  return (
    <div>
      <input type="text" value={city} onChange={(e) => changeHandle(e)} placeholder="enter city" />
    </div>
  );
};

export default Input;
