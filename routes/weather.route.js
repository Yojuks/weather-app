const { Router, response } = require("express");
const router = Router();
const Weather = require("../models/weather");
const axios = require("axios");

const getWeatherData = async (city) => {
  const result = await axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6d8309305eeab8655e9b0c4ed74f5b9e`
    )
    .then((response) => response.data);
  // console.log(request, "request");
  return result;
};

router.post("/add", async (req, res) => {
  const { city } = req.body;

  let response = await getWeatherData(city);

  const weather = await Weather.find({ city: response.name });

  if (weather.length === 0) {
    const weatherApp = new Weather({
      city: response.name,
      temperature: response.main.temp,
      description: response.weather[0].description,
      icon: response.weather[0].icon,
    });
    weatherApp.save();

    res.status(200).json(weatherApp);
  } else {
    res.status(500).json({ message: "дание уже есть" });
  }
});

router.get("/", async (req, res) => {
  try {
    const weather = await Weather.find();
    res.json(weather);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const weather = await Weather.findOneAndDelete({ _id: req.params.id });
    res.json(weather);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
