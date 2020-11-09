const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const Provider = require("../models/Provider.model");
const Session = require("../models/Session.model");
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");

// GET route => to get a list of profiles view
router.get("/list", (req, res) => {
  // let values = [2, 56, 3, 41, 0, 4, 100, 23];
  // let sum = values.reduce((previous, current) => current += previous);
  // let avg = sum / values.length;

  Provider.find()
    .then((providerProfiles) => {
      if (providerProfiles.length) {
        res.status(200).json({ providerProfiles });
      } else {
        res
          .status(404)
          .json({ errorMessage: "No provider profiles were found" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });
});

// GET route => to get a specific profile/detailed view
router.get("/list/:providerId", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.providerId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Provider.findById(req.params.providerId)
    .then((providerProfile) => {
      res.status(200).json(providerProfile);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete("/:providerId", (req, res) => {
  const { providerId } = req.params;
  Provider.findByIdAndDelete({ _id: providerId })
    .then(() => res.status(200).json({ success: "The provider was deleted" }))
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });
});

router.put("/:providerId/edit", fileUploader.single("image"), (req, res) => {
  const { providerId } = req.params;
  const {
    firstName,
    lastName,
    email,
    address,
    about,
    lessonType,
    serviceCat,
    rate,
    facebookUrl,
  } = req.body;

  Provider.findByIdAndUpdate(
    { _id: providerId },
    {
      firstName,
      lastName,
      email,
      address,
      about,
      lessonType,
      serviceCat,
      rate,
      facebookUrl,
    },
    { new: true }
  )
    .then((provider) =>
      res.status(200).json({ success: "The provider was updated", provider })
    )
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });
});

router.put("/:providerId/editPassword", (req, res) => {
  const { password, oldPassword } = req.body;

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(200).json({
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  if (!regex.test(oldPassword)) {
    res.status(200).json({
      errorMessage:
        "Old password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  Provider.findById(req.params.providerId)
    .then((provider) => {
      if (!provider) {
        return res.status(200).json({ errorMessage: "wrong credentials" });
      }
      return bcryptjs.compare(oldPassword, provider.passwordHash);
    })
    .then((response) => {
      if (!response) {
        return res
          .status(200)
          .json({ errorMessage: "wrong credentials still" });
      }
      const salt = bcryptjs.genSaltSync();
      const hashedPassword = bcryptjs.hashSync(password, salt);
      Provider.findByIdAndUpdate(req.params.providerId, {
        passwordHash: hashedPassword,
      }).then(() => {
        res.json({ status: true });
      });
    })
    .catch((err) => {
      console.log("err changing pw", err);
      res.status(500).json({ errorMessage: err.message });
    });
});

// router.get("/list/?serviceCat", (req, res, next) => {
//   const { serviceCat } = req.query;

//   Provider.find(serviceCat)
//     .then((providerFiltered) => {
//       res.status(200).json(providerFiltered);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });

router.get("/list/:Search", (req, res) => {
  console.log(`SEARCH PARAMS`, req.params);
  console.log(`SEARCH serviceCat`, req.params.serviceCat);
  const searchParams = req.params.Search;

  Provider
    // get ALL occurrences (g), be case insensitive (i)
    .find({
      $or: [
        { serviceCat: RegExp(`\\b${searchParams}`, "gi") },
        { lessonType: RegExp(`\\b${searchParams}`, "gi") },
      ],
    })
    // .find({
    //   $or: [
    //     { serviceCat: { $regex: `${searchParams}` } },
    //     { lessonType: { $regex: `${searchParams}` } },
    //   ],
    // })
    .then((providerResults) => {
      console.log(`SEARCH RESULTS FROM DB`, providerResults);
      res.status(200).json(providerResults);
    })
    .catch((error) => res.status(500).json({ errorMessage: error }));
});

module.exports = router;
