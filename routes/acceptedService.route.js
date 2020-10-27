
const { Router } = require("express");
const router = new Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Provider = require("../models/Provider.model");
const Session = require("../models/Session.model");
const AcceptedService = require("../models/AcceptedService.model");


router.get("/list/:userId", (req, res) => {
    const { userId } = req.params;

    console.log(userId);
    AcceptedService.find({ userId: userId })
      .then((acceptedServiceList) => {
        if (acceptedServiceList.length) {
          res.status(200).json({ acceptedServiceList });
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

  router.get("/list/:providerId", (req, res) => {
    const { providerId } = req.params;
    console.log(providerId);
    AcceptedService.find({ providerId: providerId })
      .then((acceptedServiceList) => {
        if (acceptedServiceList.length) {
          res.status(200).json({ acceptedServiceList });
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
    const { userId, providerId, serviceCat, lessonType, rate, totalPrice, quantity } = req.body;

    //controlling request data
    if (!quantity || !userId || !providerId ) {
      res.status(500).json({ errorMessage: " quantity is empty" });
      return;
    }
    AcceptedService.create({ 
      
        userId,
        providerId,
        quantity,
        serviceCat,
        lessonType,
        rate,
        totalPrice,
        quantity
    })
      .then((acceptedService) => {
        res.status(201).json({acceptedService });
        
      })
      .catch((err) => {
        res
          .status(500)
          .json({ errorMessage: "Internal error", errorDetail: err });
      });
  });

  router.get("/:acceptedServiceId", (req, res) => {
    const { acceptedServiceId } = req.params;
    console.log(acceptedServiceId);
  
    AcceptedService.findById(acceptedServiceId)
    .populate("requestedserviceId")
      
      
      .then((foundacceptedService) => {
        res.status(201).json({ foundacceptedService });
      })
  
      .catch((err) =>
        console.log(`Err while getting a single accepted service from the  DB: ${err}`)
      );
  });


module.exports = router;