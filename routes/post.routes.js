const { Router } = require("express");
const router = new Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Provider = require("../models/Provider.model");
const Post = require("../models/Post.model");

// ****************************************************************************************
// POST route to submit the form to create a post
// ****************************************************************************************

// <form action="/post-create" method="POST">
router.post("/create", (req, res) => {
  const { userId, providerId, comment, rating } = req.body;
  Post.create({ userId, providerId, comment, rating })
    .then((dbPost) => {
      res.status(201).json({ dbPost });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });
});

router.get("/list/:providerId", (req, res) => {
  const { providerId } = req.params;
  Post.find({ providerId: providerId })
    .populate("userId")

    .then((dbPostsList) => {
      if (dbPostsList.length) {
        res.status(200).json({ dbPostsList });
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

router.get("/:postId", (req, res) => {
  const { postId } = req.params;

  Post.findById(postId)
    .populate("authorId")
    .populate("reciverId")

    .then((foundPost) => {
      res.status(201).json({ foundPost });
    })

    .catch((err) =>
      console.log(
        `Err while getting a single requested service from the  DB: ${err}`
      )
    );
});

module.exports = router;
