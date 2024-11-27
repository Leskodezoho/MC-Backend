const express = require("express");
const app = express();
const fetch = require('node-fetch')
const dotenv = require("dotenv");
require("dotenv").config();
var cors = require("cors");
app.use(cors({ orgin: "*" }));
app.use(express.json());
var signuprouter = require("./routes/signup");
var signinrouter = require("./routes/loginzoho");
var homerouter = require("./routes/home");
var forgot = require("./routes/forgotpws");
const port = process.env.PORT || 3000;
app.use("/signup", signuprouter);
app.use("/signin", signinrouter);
app.use("/home", homerouter);
app.use("/forgot", forgot);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
