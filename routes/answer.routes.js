const { Router } = require("express");
const router = new Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Provider = require("../models/Provider.model");
const Answer = require("../models/Answer.model");

// ****************************************************************************************
// ANSWER route to submit the form to create a answer
// ****************************************************************************************

// <form action="/answer-create" method="POST">
router.post("/create", (req, res) => {
  const { autorId, reciverId, comment, rating } = req.body;
  Answer.create({ autorId, reciverId, comment, rating })
    .then((dbAnswer) => {
      return User.findByIdAndUpdate(reciverId, {
        $push: { answers: dbAnswer._id },
      });
    })
    .then((dbAnswer) => {
      res.status(201).json({ dbAnswer });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });
});

router.get("/list/:reciverId", (req, res) => {
  const { reciverId } = req.params;
  Answer.find({ reciverId: reciverId })
    .populate("authorId")
    // .then(dbPosts => {
    //   console.log(dbPosts);
    //   res.render('posts/list', { posts: dbPosts });
    // })
    // .catch(err => console.log(`Err while getting the posts from the DB: ${err}`));
    .then((dbAnswersList) => {
      if (dbAnswersList.length) {
        res.status(200).json({ dbAnswersList });
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

router.get("/:answerId", (req, res) => {
  const { answerId } = req.params;

  Answer.findById(answerId)
    .populate("authorId")
    .populate("reciverId")

    .then((foundAnswer) => {
      res.status(201).json({ foundAnswer });
    })

    .catch((err) =>
      console.log(
        `Err while getting a single requested service from the  DB: ${err}`
      )
    );
});

module.exports = router;
