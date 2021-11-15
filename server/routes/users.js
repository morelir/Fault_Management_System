const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const {
  UserModel,
  validUser,
  validLogin,
  genToken,
} = require("../models/userModel");
const { authToken } = require("../auth/authToken");

router.get("/", async(req, res) => {
  let users = await UserModel.find();
  res.json(users);
});

router.get("/userInfo", authToken, async (req, res) => {
  let user = await UserModel.findOne({ _id: req.tokenData._id }, { pass: 0 });
  res.json(user);
});

router.post("/", async (req, res) => {
  let validBody = validUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    user.pass = await bcrypt.hash(user.pass, 10);
    await user.save(); //שומר את המידע ב db
    user.pass = "*****";
    res.json(user);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ err: "Email already in system or there another problem" });
  }
});

router.post("/login", async (req, res) => {
  let validBody = validLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  //נבדוק אם המייל שנשלח בבאדי קיים במסד נתונים
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ msg: "User not found" });
  }
  //נבדוק שהסיסמא שנשלחה מתאימה להצפנה שנמצאת במסד
  let passValid = await bcrypt.compare(req.body.pass, user.pass);
  if (!passValid) {
    return res.status(401).json({ msg: "Password wrong" });
  }
  //נחזיר הודעה שהכל בסדר ונייצר טוקן
  let newToken = genToken(user.id);
  res.json({ token: newToken });
});

module.exports = router;
