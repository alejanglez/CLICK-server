const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");

////////////////////////////////////////////////////////////////////////
///////////////////////////// UPLOAD IMAGE /////////////////////////////
////////////////////////////////////////////////////////////////////////

router.post("/image", fileUploader.single("image"), (req, res) => {
  console.log(req.file);
  res.json(req.file.path);
});

// GET route => to get a list of profiles view
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

// GET route => to get a specific profile/detailed view
router.get("/list/:userId", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(req.params.userId)
    .then((userProfile) => {
      res.status(200).json(userProfile);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete("/:userId", (req, res) => {
  const { userId } = req.params;
  User.findByIdAndDelete({ _id: userId })
    .then(() => res.status(200).json({ success: "The user was deleted" }))
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });
});

router.put("/:userId/editPassword", (req, res) => {
  const { password, oldPassword } = req.body;
  console.log("test", req.body, password, oldPassword);
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
        "oldPassword needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  User.findById(req.params.userId)
    .then((user) => {
      console.log("HELLLO", oldPassword, user.passwordHash);
      if (!user) {
        return res.status(200).json({ errorMessage: "wrong credentials" });
      }
      return bcryptjs.compare(oldPassword, user.passwordHash);
    })
    .then((response) => {
      if (!response) {
        return res
          .status(200)
          .json({ errorMessage: "wrong credentials still" });
      }
      const salt = bcryptjs.genSaltSync();
      const hashedPassword = bcryptjs.hashSync(password, salt);
      User.findByIdAndUpdate(req.params.userId, {
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

router.put("/:userId/edit", fileUploader.single("image"), (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, address, about, imageUrl } = req.body;

  // let imageUrl;
  // if (req.file) {
  //   imageUrl = req.file.path;
  // } else {
  //   imageUrl = req.body.existingImage;
  // }

  User.findByIdAndUpdate(
    { _id: userId },
    { firstName, lastName, email, address, about, imageUrl },
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
