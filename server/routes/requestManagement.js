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
  // if (validBody.error) {
  //   console.log("blat")
  //   return res.status(400).json(validBody.error.details);
  // }
  try {
    let request = new RequestModel(req.body);
    await request.save(); //שומר את המידע ב db
    res.json({});
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    let requests = await RequestModel.find({}).lean();
    let data = await mergeFaultsAndUsers(requests);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

const mergeFaultsAndUsers = async (requests) => {
  try {
    let data = await Promise.all(
      requests.map(async (request) => {
        if (request.teamMemberID !== null) {
          let teamMember = await UserModel.findOne(
            { id: request.teamMemberID },
            "-_id name surname"
          ).lean();
          return {
            ...request,
            teamMemberName: teamMember.name,
            teamMemberSurname: teamMember.surname,
          };
        }
        return request;
      })
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = router;
