// routes/auth.routes.js

const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const Provider = require("../models/Provider.model");
const Session = require("../models/Session.model");
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");

////////////////////////////////////////////////////////////////////////
///////////////////////////// UPLOAD IMAGE /////////////////////////////
/////////////////////////////////////////////////////////////////////////

router.post("/image", fileUploader.single("image"), (req, res) => {
  console.log(req.file);
  res.json(req.file.path);
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// SIGNUP //////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .post() route ==> to process form data
router.post("/signup", (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    address,
    about,
    imageUrl,
    lessonType,
    serviceCat,
    aptitudes,
    rate,
    facebookUrl,
  } = req.body;

  if (!lastName || !email || !password) {
    res.status(200).json({
      errorMessage:
        "All fields are mandatory. Please provide your Lastname, email and password.",
    });
    return;
  }

  // make sure passwords are strong:

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(200).json({
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return Provider.create({
        firstName,
        lastName,
        email,
        passwordHash: hashedPassword,
        address,
        about,
        lessonType,
        serviceCat,
        aptitudes,
        rate,
        facebookUrl,
        imageUrl,
      });
    })
    .then((profileInformation) => {
      Session.create({
        providerId: profileInformation._id,
        createdAt: Date.now(),
      }).then((session) => {
        res.status(200).json({ accessToken: session._id, profileInformation });
      });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(200).json({ errorMessage: error.message });
      } else if (error.code === 11000) {
        console.log("error", error);
        res.status(200).json({
          errorMessage:
            "Lastname and email need to be unique. Either last name or email is already used.",
        });
      } else {
        res.status(500).json({ errorMessage: error });
      }
    }); // close .catch()
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGIN ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// .post() login route ==> to process form data
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(500).json({
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  Provider.findOne({ email })
    .then((profileInformation) => {
      if (!profileInformation) {
        res.status(200).json({
          errorMessage: "Email is not registered. Try with other email.",
        });
        return;
      } else if (
        bcryptjs.compareSync(password, profileInformation.passwordHash)
      ) {
        Session.create({
          providerId: profileInformation._id,
          createdAt: Date.now(),
        }).then((session) => {
          res
            .status(200)
            .json({ accessToken: session._id, profileInformation });
        });
      } else {
        res.status(200).json({ errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => res.status(500).json({ errorMessage: err }));
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// LOGOUT ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

router.post("/logout", (req, res) => {
  Session.deleteOne({
    providerId: req.body.accessToken,
  })
    .then((session) => {
      res.status(200).json({ success: "Provider was logged out" });
    })
    .catch((error) => res.status(500).json({ errorMessage: error }));
});

router.get("/session/:accessToken", (req, res) => {
  const { accessToken } = req.params;
  Session.findById({ _id: accessToken })
    .populate("providerId")
    .then((session) => {
      console.log("session prov", session);
      if (!session) {
        res.status(200).json({
          errorMessage: "Session does not exist",
        });
      } else {
        res.status(200).json({
          session,
        });
      }
    })
    .catch((err) => res.status(500).json({ errorMessage: err }));
});

module.exports = router;
