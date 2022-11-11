const bcrypt = require("bcryptjs");

const Users = [
  {
    name: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "srj",
    email: "srj@srj.com",
    password: bcrypt.hashSync("1234", 10),
  },
  {
    name: "user",
    email: "user@user.com",
    password: bcrypt.hashSync("1234", 10),
  },
];

module.exports = Users;
