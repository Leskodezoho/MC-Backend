
const dotenv = require("dotenv");
const analyticsClient = require("../AnalyticsClient");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/users.json");

async function exportfun() {
    const clientId = process.env.clientId;
    const clientSecret = process.env.clientSecret;
    const refreshtoken =process.env.refreshtoken;
    const orgId = process.env.orgId;
    const workspaceId = process.env.workspaceId;
    const viewId = process.env.viewId;
  
    const ac = new analyticsClient(clientId, clientSecret, refreshtoken);
    const bulk = ac.getBulkInstance(orgId, workspaceId);
  
    try {
      await bulk.exportData(viewId, "json", filePath);
      console.log("Data exported successfully.");
      return "Data exported successfully.";
    } catch (error) {
      console.error("Error during data export:", error);
      return res.status(500).json({ error: "Failed to export user data." });
    }
  
    // Log the result of userExistsInFile
    const userExists = await userExistsInFile(filePath, email, password);
    console.log("User exists after export:", userExists);
  
}


module.exports = { exportfun};
