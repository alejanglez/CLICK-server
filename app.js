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
const providerProfileRouter = require("./routes/provider.profile.route");
const requestedServiceRouter = require("./routes/requestedService.route");
const acceptedServiceRouter = require("./routes/acceptedService.route");
const postRouter = require("./routes/review.routes");

const app = express();

//CORS configuration
app.use(
  cors({
    // credentials: true,
    origin: [process.env.ORIGIN],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/provider", providerRouter);
app.use("/user/profile", userProfileRouter);
app.use("/provider/profile", providerProfileRouter);

app.use("/requested", requestedServiceRouter);
app.use("/accepted", acceptedServiceRouter);
app.use("/review", postRouter);

module.exports = app;
