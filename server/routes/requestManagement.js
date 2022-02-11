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

router.post("/EditRequestModal", async (req, res) => {
  // let validBody = validNewFault(req.body);
  // if (validBody.error) {
  //   console.log("blat")
  //   return res.status(400).json(validBody.error.details);
  // }
  try {
    let request = await RequestModel.findOne({ _id: req.body._id });
    request = updateRequest(request, req.body);
    await request.save();
    res.json({});
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Error" });
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

const updateRequest = (request, updateRequest) => {
  request.number = updateRequest.number;
  request.status = updateRequest.status;
  request.team = updateRequest.team;
  request.note = updateRequest.note;
  request.teamMemberID = updateRequest.teamMemberID;
  return request;
};

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
