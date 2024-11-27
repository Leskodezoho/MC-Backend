const users = require("../models/user.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const analyticsClient = require("../AnalyticsClient");
const fs = require("fs");
const path = require("path");
const { exportfun } = require("../controllers/export");
dotenv.config();
const filePath = path.join(__dirname, "../data/users.json");
const userExistsInFile = async (filePath, username) => {
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
      
        if (user.Password===null||user.Password=="") {
          return "Allow"; // Login successful
        } 
        else {
          console.log("Already Password created:", user.Email);
          return "Already password created"; // Incorrect password
        }
      }
    }

    console.log("User not found in the file.");
    return "User not found"; // User not found
  } catch (error) {
    console.error("Error reading or parsing user file:", error);
    return "error";
  }
};
async function CheckUser(email) {
  console.log("password setup received for:", email);

  // Check if user exists in the JSON file
  if (await userExistsInFile(filePath, email)==="Allow") {
    return "Allow";
  }

  console.log("User not found. Exporting data again...");
  var eportDate=await exportfun();
 
  // Log the result of userExistsInFile
  const userExists = await userExistsInFile(filePath, email);
  console.log("User exists after export:", userExists);

  // Check again if the user exists in the JSON file
  if (userExists ==="Allow") {
    return "Allow";
  } else  if (userExists ==="User not found") {
    return "User not found";
  }
  else  if (userExists ==="Already password created") {
    return "Already password created";
  }
  else   {
    return "server busy";
  }
}


var reponse= {};
const validatetoken = async (filePath, clientToken) => {
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
      if (user.Token === clientToken) {
        console.log("User found:", user.Email);
        reponse={
          Token:user.Token,
          UniqueID:user.UniqueID
        }
          return true; // Login successful
      }
    }

    console.log("User not found in the file.");
    return false; // User not found
  } catch (error) {
    console.error("Error reading or parsing user file:", error);
    return "error";
  }
};
async function AuthorizeUser(token) {
  try {
    
  console.log("login:", token);

  console.log("User not found. Exporting data again...");
  var eportDate=await exportfun();
  
  const userExists = await validatetoken(filePath, token);
  console.log("User exists after export:", userExists);

  // Check again if the user exists in the JSON file
  if (userExists) {
    return reponse;
  } 
  else   {
    return false;
  }

  } catch (error) {
    console.log(error);
  }
}
module.exports = { CheckUser, AuthorizeUser };
