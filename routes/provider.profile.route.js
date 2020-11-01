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
  const { firstName, lastName, email, password, address, about } = req.body;
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = req.body.existingImage;
  }
  Provider.findByIdAndUpdate(
    { _id: providerId },
    { firstName, lastName, email, password, address, about },
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
