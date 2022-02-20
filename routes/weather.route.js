const { Router } = require("express");
const router = Router();
const Weather = require("../models/weather");

router.post("/add", async (req, res) => {
  try {
    const { weather } = req.body;
    console.log(weather, "weather");
    const weatherApp = new Weather({
      city: weather.city,
      // temperature: weather.main.temp,
      // description: weather[0].description,
      // icon: weather.weather[0].icon,
    });

    await weatherApp.save();
    res.status(200).json(weatherApp);
  } catch (error) {
    console.log(error);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const { userId } = req.query;
//     const weather = await Weather.find();
//     res.json(weather);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const weather = await Weather.findOneAndDelete({ _id: req.params.id });
//     res.json(weather);
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
