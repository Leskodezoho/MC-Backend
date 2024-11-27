const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const { exportfun } = require("../controllers/export");

// Define the JSON file path
const filePath = path.join(__dirname, "../data/users.json");
var response={};
// Helper function to check if a user exists in the JSON file
const userExistsInFile = async (filePath, username, password) => {
  if (!fs.existsSync(filePath)) {
    console.log("User data file does not exist.");
    return false; // File doesn't exist
  }

  try {
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Validate structure of the file
    if (!fileData.data || !Array.isArray(fileData.data)) {
      console.log("Invalid data format in user file.");
      return false;
    }

    // Asynchronous loop to validate user and password
    for (const user of fileData.data) {
      if (user.Email === username) {
        console.log("User found:", user.Email);
        response = {
      
    
          email: user.Email,
          token: user.Token,
                  status: true
        };
        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (isPasswordValid) {

          return true; // Login successful
        } else {
          console.log("Incorrect password for user:", user.Email);
          return false; // Incorrect password
        }
      }
    }

    console.log("User not found in the file.");
    return false; // User not found
  } catch (error) {
    console.error("Error reading or parsing user file:", error);
    return false;
  }
};

// Route for user login
router.post("/", async (req, res) => {
  const { email, password } = req.body; // Assuming the username is sent in the request body

  console.log("Login request received for:", email);

  try {
    // Initial user validation
    if (await userExistsInFile(filePath, email, password)) {
      return res.status(200).json(response);

    }

    console.log("User not found. Exporting data...");
    await exportfun();

    // Re-check user validation after export
    if (await userExistsInFile(filePath, email, password)) {
      return res.status(200).json(response);
    } else {
      return res.status(403).json({ message: "Access denied. User not found." });
    }
  } catch (error) {
    console.error("Error during login process:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
