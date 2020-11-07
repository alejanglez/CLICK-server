const { Router } = require("express");
const router = new Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Provider = require("../models/Provider.model");
const Review = require("../models/Review.model");

// ****************************************************************************************
// POST route to submit the form to create a review
// ****************************************************************************************

// <form action="/review-create" method="POST">
router.post("/create", (req, res) => {
  const { author, userId, providerId, comment, rating } = req.body;
  Review.create({ author, userId, providerId, comment, rating })
    .then((dbReview) => {
      res.status(201).json({ dbReview });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });
});

router.get("/list/:providerId", (req, res) => {
  const { providerId } = req.params;
  Review.find({ providerId: providerId })
    .populate("userId")

    .then((dbReviewsList) => {
      if (dbReviewsList.length) {
        res.status(200).json({ dbReviewsList });
      } else {
        res
          .status(404)
          .json({ errorMessage: "No resquested services were found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });
});

// ****************************************************************************************
// GET route for displaying the post details page
// shows how to deep populate (populate the populated field)
// ****************************************************************************************

router.get("/:reviewId", (req, res) => {
  const { reviewId } = req.params;

  Review.findById(reviewId)
    .populate("userId")
    .populate("providerId")

    .then((foundReview) => {
      res.status(201).json({ foundReview });
    })

    .catch((err) =>
      console.log(
        `Err while getting a single requested service from the  DB: ${err}`
      )
    );
});

module.exports = router;
