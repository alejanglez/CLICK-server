
const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");


router.get("/list", (req, res) => {
  User.find()
    .then((userProfiles) => {
      if (userProfiles.length) {
        res.status(200).json({ userProfiles });
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


router.delete("/:userId", (req, res) => {
  const { userId } = req.params;
  Task.findByIdAndDelete({ _id: userId })
    .then(() => res.status(200).json({ success: "The user was deleted" }))
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });
});

router.put("/:userId/edit", fileUploader.single("image"), (req, res) => {
    const {userId} = req.params;
    const {firstName, lastName, email, password, address, about} = req.body;
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = req.body.existingImage;
    }
    User.findByIdAndUpdate({_id: userId},{firstName, lastName, email, password, address, about},{new: true})
    .then((user) => res.status(200).json({ success: "The user was updated" , user}))
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });

});

module.exports = router;
