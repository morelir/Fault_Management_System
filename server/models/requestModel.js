const mongoose = require("mongoose");
const Joi = require("joi");

const requestSchema = new mongoose.Schema({
  number: Number,
  products: [],
  status: String,
  team: String,
  teamMemberID: Number,
  note:String,
  date_created: {
    type: Date,
    default: Date.now,
  },
});

exports.RequestModel = mongoose.model("requests", requestSchema);

exports.validNewRequest = (_bodyData) => {
  let joiSchema = Joi.object({
    number: Joi.number().min(1).max(99).required(),
    status: Joi.string().min(1).max(99).required(),
    clientID: Joi.number().min(9).max(9).required(),
    team: Joi.string().min(1).max(99).required(),
  });
  return joiSchema.validate(_bodyData);
};
