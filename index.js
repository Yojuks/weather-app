const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }));
// app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/weather", require("./routes/weather.route"));

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://andriiyozh:andriiyozh@cluster0.nslgs.mongodb.net/weather?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      }
    );
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();
