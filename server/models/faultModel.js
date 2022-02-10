const mongoose = require("mongoose");
const Joi = require("joi");

const faultSchema = new mongoose.Schema({
  number: Number,
  status: String,
  clientID: Number,
  description: String,
  team: String,
  teamMemberID: Number,
  request:{
    type: Boolean,
    default: false,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});


exports.FaultModel = mongoose.model("faults", faultSchema);

exports.validNewFault = (_bodyData) => {
  let joiSchema = Joi.object({
    number: Joi.number().min(1).max(99).required(),
    status: Joi.string().min(1).max(99).required(),
    clientID: Joi.number().min(9).max(9).required(),
    description: Joi.string().min(1).max(1000).required(),
    team: Joi.string().min(1).max(99).required(),
  });
  return joiSchema.validate(_bodyData);
};

// const generateFaultNumber=()=> {
//   let data = await FaultModel.findOne({}, "-_id number").sort("-date_created");
//   if (data) {
//     return data.number + 1;
//   } else {
//     return data;
//   }
// }

