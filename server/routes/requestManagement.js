const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { UserModel } = require("../models/userModel");
const { ClientModel } = require("../models/clientModel");
const { TeamModel } = require("../models/teamModel");
const { RequestModel } = require("../models/requestModel");

router.get("/", async (req, res) => {
  try {
    let requests = await RequestModel.find({}).lean();
    let data = await mergeRequestsAndUsers(requests);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

router.put("/closeRequest", async (req, res) => {
  try {
    request = await RequestModel.findOne({ _id: req.body._id });
    request.status = "Close";
    await request.save();
    let requests = await RequestModel.find({}).lean();
    data = await mergeRequestsAndUsers(requests);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});



const mergeRequestsAndUsers = async (requests) => {
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
