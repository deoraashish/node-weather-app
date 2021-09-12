const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define key paths for the express configuration
const pathToPublicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set the view engine and views directory
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set the static assets directory (public directory)
app.use(express.static(pathToPublicDirectory));

// endpoints
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ashish Deora",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Ashish Deora",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "How may we help you?",
    name: "Ashish Deora",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  geocode(req.query.address, (error, { longitude, latitude, place } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    forecast(longitude, latitude, (error, weatherPrediction) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        location: place,
        forecast: weatherPrediction,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search string",
    });
  }

  console.log(req.query);
  res.send({
    message: "Got your request",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    pageName: "Help page",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    pageName: "Page",
    name: "Ashish Deora",
  });
});

app.listen(3000, () => {
  console.log("Express Server started");
});
