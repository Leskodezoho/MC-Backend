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
var getcustomcertificate = require("./routes/getfile");
var upload = require("./routes/uploadfile");


const port = process.env.PORT || 3000;
app.get("/", async (req, res) => {

  res.send("App Running");
  consloe.log("App Running");
})
app.use("/signup", signuprouter);
app.use("/signin", signinrouter);
app.use("/home", homerouter);
app.use("/forgot", forgot);
app.use("/getcustomcertificate", getcustomcertificate);
app.use("/upload", upload);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
