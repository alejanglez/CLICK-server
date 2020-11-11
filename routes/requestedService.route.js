const { Router } = require("express");
const router = new Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Provider = require("../models/Provider.model");
const Session = require("../models/Session.model");
const RequestedService = require("../models/RequestedService.model");

router.get("/user/list/:userId", (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  RequestedService.find({ userId: userId })
    .populate("providerId") //check if its working
    .populate("userId") //check if its working
    .then((requestedServiceList) => {
      if (requestedServiceList.length) {
        res.status(200).json({ requestedServiceList });
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

router.get("/provider/list/:providerId", (req, res) => {
  const { providerId } = req.params;
  console.log(providerId);
  RequestedService.find({ providerId: providerId })
    .populate("userId") //check if its working
    .populate("providerId") //check if its working
    .then((requestedServiceList2) => {
      if (requestedServiceList2.length) {
        res.status(200).json({ requestedServiceList2 });
      } else {
        res
          .status(404)
          .json({ errorMessage: "No resquested services were foundwwwww" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });
});

router.post("/", (req, res) => {
  const { quantity, userId, providerId, date } = req.body;

  //controlling request data
  if (!quantity) {
    res.status(500).json({ errorMessage: " quantity is empty" });
    return;
  }
  RequestedService.create({
    quantity,
    userId,
    providerId,
    date,
    decline: false,
  })
    .then((requestedService) => {
      res.status(201).json({ requestedService });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });
});

router.get("/:requestedServiceId", (req, res) => {
  const { requestedServiceId } = req.params;
  console.log(requestedServiceId);

  RequestedService.findById(requestedServiceId)
    .populate("userId")
    .populate("providerId")

    .then((foundRequestedService) => {
      res.status(201).json({ foundRequestedService });
    })

    .catch((err) =>
      console.log(
        `Err while getting a single requested service from the  DB: ${err}`
      )
    );
});

router.put("/:requestedServiceId/edit", (req, res) => {
  const { requestedServiceId } = req.params;

  RequestedService.findByIdAndUpdate(
    { _id: requestedServiceId },
    { decline: true },
    { new: true }
  )
    .then((foundRequestedService) =>
      res.status(200).json({
        success: "The requested service was updated",
        foundRequestedService,
      })
    )
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Internal error", errorDetail: err });
    });
});

module.exports = router;
