const express = require("express");
const router = express.Router();
const { AuthorizeUser } = require("../controllers/login");
router.get("/", async (req, res) => {
  try {
    const auth_token = await req.headers.authorization;
    const loginCredential = await AuthorizeUser(auth_token);
    if (loginCredential === false) {
      res.status(200).send("Invalid Token");
    } else {
      res.json(loginCredential);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Server busy");
  }
});
module.exports = router;
