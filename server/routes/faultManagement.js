const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { FaultModel, validNewFault } = require("../models/faultModel");
const { UserModel } = require("../models/userModel");
const { ClientModel } = require("../models/clientModel");
const { TeamModel } = require("../models/teamModel");

router.get("/", async (req, res) => {
  try {
    let faults = await FaultModel.find({}).lean();
    let data = await mergeFaultsAndUsers(faults);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

// router.get("/NewFaultModel/newNumber", async (req, res) => {
//   let data = await FaultModel.findOne({}, "-_id number").sort("-date_created");
//   if (data) {
//     res.json(data.number + 1);
//   } else {
//     res.json(data);
//   }
// });

// Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
//   if (err) return handleError(err);
//   // Prints "Space Ghost is a talk show host".
//   console.log('%s %s is a %s.', person.name.first, person.name.last,
//     person.occupation);
// });

router.put("/clientID", async (req, res) => {
  let data = await UserModel.findOne({ id: req.body.id }, "-_id name surname");
  res.json(data);
});

router.post("/NewFaultModel", async (req, res) => {
  let validBody = validNewFault(req.body);
  console.log(req.body);
  // if (validBody.error) {
  //   console.log("blat")
  //   return res.status(400).json(validBody.error.details);
  // }
  try {
    let fault = new FaultModel(req.body);
    fault.number = await generateFaultNumber();
    await fault.save(); //שומר את המידע ב db
    let faults = await FaultModel.find({}).lean();
    data = await mergeFaultsAndUsers(faults);
    console.log(fault.number);
    res.json({ faults: data, faultNumber: fault.number });
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Error" });
  }
});

const generateFaultNumber = async () => {
  let data = await FaultModel.findOne({}, "-_id number").sort("-date_created");
  if (data) {
    return data.number + 1;
  } else {
    return data;
  }
};

const mergeFaultsAndUsers = async (faults) => {
  try {
    let data = await Promise.all(
      faults.map(async (fault) => {
        let client = await ClientModel.findOne(
          { id: fault.clientID },
          "-_id name surname"
        ).lean();
        console.log(client);
        if (fault.teamMemberID !== null) {
          let teamMember = await UserModel.findOne(
            { id: fault.teamMemberID },
            "-_id name surname"
          ).lean();
          return {
            ...fault,
            clientName: client.name,
            clientSurname: client.surname,
            teamMemberName: teamMember.name,
            teamMemberSurname: teamMember.surname,
          };
        }
        return {
          ...fault,
          clientName: client.name,
          clientSurname: client.surname,
        };
      })
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};

router.post("/EditFaultModel", async (req, res) => {
  let validBody = validNewFault(req.body);
  console.log(req.body);
  // if (validBody.error) {
  //   console.log("blat")
  //   return res.status(400).json(validBody.error.details);
  // }
  try {
    fault = await FaultModel.findOne({ _id: req.body._id });
    // fault.team="Logisti" //שומר את המידע ב db
    fault = updateFault(fault, req.body);
    await fault.save();
    let faults = await FaultModel.find({}).lean();
    data = await mergeFaultsAndUsers(faults);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Error" });
  }
});

const updateFault = (fault, updateFault) => {
  fault.number = updateFault.number;
  fault.status = updateFault.status;
  fault.clientID = updateFault.clientID;
  fault.team = updateFault.team;
  fault.description = updateFault.description;
  fault.teamMemberID = updateFault.teamMemberID;
  return fault;
};

router.put("/closeFault", async (req, res) => {
  try {
    fault = await FaultModel.findOne({ _id: req.body._id });
    fault.status = "Close";
    await fault.save();
    let faults = await FaultModel.find({}).lean();
    data = await mergeFaultsAndUsers(faults);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/teams", async (req, res) => {
  teams = await TeamModel.find();
  res.json(teams);
});

router.get("/users", async (req, res) => {
  users = await UserModel.find();
  res.json(users);
});

router.get("/clients", async (req, res) => {
  clients = await ClientModel.find();
  res.json(clients);
});

module.exports = router;
