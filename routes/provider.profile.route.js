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
  // let values = [];
  // let sum = values.reduce((previous, current) => current += previous);
  // let avg = sum / values.length;

  Provider.find()
    .then((providerProfiles) => {
      if (providerProfiles.length) {
        res.status(200).json({ providerProfiles });
      } else {
        res.status(404).json({ errorMessage: "No user profiles were found" });
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

  User.findById(req.params.providerId)
    .then((providerProfile) => {
      res.status(200).json(providerProfile);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete("/:providerId", (req, res) => {
  const { providerId } = req.params;
  User.findByIdAndDelete({ _id: providerId })
    .then(() => res.status(200).json({ success: "The user was deleted" }))
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
  User.findByIdAndUpdate(
    { _id: providerId },
    { firstName, lastName, email, password, address, about },
    { new: true }
  )
    .then((user) =>
      res.status(200).json({ success: "The user was updated", user })
    )
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });
});

module.exports = router;
