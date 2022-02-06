const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { FaultModel, validNewFault } = require("../models/faultModel");
const { UserModel } = require("../models/userModel");
const { ClientModel } = require("../models/clientModel");
const { TeamModel } = require("../models/teamModel");
const { RequestModel } = require("../models/requestModel");

router.post("/NewRequest", async (req, res) => {
  let validBody = validNewFault(req.body);
  console.log(req.body);
  // if (validBody.error) {
  //   console.log("blat")
  //   return res.status(400).json(validBody.error.details);
  // }
  try {
    let request = new RequestModel(req.body);
    console.log(request);
    await request.save(); //שומר את המידע ב db
    res.json({});
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Error" });
  }
});

module.exports = router;
