const indexR = require("./index");
const userR = require("./users");
const loginR = require("./login");
const registerR = require("./register");
const faultManagementR = require("./faultManagement");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", userR);
  app.use("/login", loginR);
  app.use("/register", registerR);
  app.use("/faultManagement", faultManagementR);
};
