const axios = require("axios");
const cors = require("cors");
// dotenv config object
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const gamesRoute = require("./routes/games");
const usersRoute = require("./routes/user");
const collectionsRoute = require("./routes/collection");
const profilesRoute = require("./routes/profiles");
// Set Default API Headers / URL
axios.defaults.baseURL = "https://api.igdb.com/";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Client-ID"] = process.env.IGDB_CLIENT;
axios.defaults.headers.common["Authorization"] = process.env.IGDB_AUTH;

// Initialize app
const app = express();

// let corsOption = {
//   origin: "https://vgbl.netlify.app/",
//   optionsSuccessStatus: 200,
// };
app.use(cors());

app.use(express.json());

// Dev console path, method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Images testing
app.use(express.static("public"));

// Routes

app.use("/api/profiles/", profilesRoute);

app.use("/api/users/", usersRoute);

app.use("/api/games/", gamesRoute);

app.use("/api/collection/", collectionsRoute);

// Connect to DB
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB && Listening on Port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
// Server listening to port env
