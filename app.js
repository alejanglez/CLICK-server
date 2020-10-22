require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("./config/db.config");


//Router definition
const userRouter = require("./routes/user.route");
const providerRouter = require("./routes/provider.route");
const userProfileRouter = require("./routes/user.profile.route");

const app = express();

//CORS configuration
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/provider", providerRouter);
app.use("/user/profile", userProfileRouter);

module.exports = app;
