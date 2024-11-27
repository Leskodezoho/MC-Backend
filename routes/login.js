const express = require("express");
const router = express.Router();
const { AuthenticateUser } = require("../controllers/login");
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  var loginauth = await AuthenticateUser(email, password);
  res.status(200).send(loginauth);
});
module.exports = router;
