const express = require("express");
const app = express();
const { pharmacies } = require("./controllers");

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("x-powered-by", "serverless-express");
  next();
});

// Enable JSON use
app.use(express.json());

// Since Express doesn't support error handling of promises out of the box,
// this handler enables that
const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Pharmacy Routes
 */

app.post("/pharmacy", asyncHandler(pharmacies.getByLatitudeAndLongitude));

// app.post("/pharmacy", asyncHandler(pharmacies.insert));

app.get(`/*`, (req, res) => {
  res.status(404).send("Route not found");
});

/**
 * Error Handler
 */
app.use(function (err, req, res, next) {
  console.error(err);
  res
    .status(500)
    .json({ error: `Internal Serverless Error - "${err.message}"` });
});

module.exports = app;
