
const { Router } = require("express");
const router = new Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Provider = require("../models/Provider.model");
const Session = require("../models/Session.model");
const RequestedService = require("../models/RequestedService.model");


router.get("/list/:userId", (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    RequestedService.find({ userId: userId })
      .then((requestedService) => {
        if (requestedService.length) {
          res.status(200).json({ requestedService });
        } else {
          res.status(404).json({ errorMessage: "No resquested services were found" });
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
    const { quantity, userId, providerId  } = req.body;

    //controlling request data
    if (!quantity) {
      res.status(500).json({ errorMessage: " quantity is empty" });
      return;
    }
    RequestedService.create({ 
        quantity,
        userId,
        providerId,
    })
      .then((requestedService) => {
        // res.status(201).json({ requestedService });
        console.log("requested service",requestedService);
        console.log("session:", req.session);
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
        console.log(`Err while getting a single requested service from the  DB: ${err}`)
      );
  });


module.exports = router;
