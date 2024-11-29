const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const fetch = require("node-fetch"); // Ensure you install: npm install node-fetch

dotenv.config();

// Zoho API Headers
const apiHeaders = {
  "Authorization": process.env.ZOHO_AUTH_TOKEN // Use environment variable for security
};

// Define a route for the Zoho API call
router.get("/", async (req, res) => {
  console.log("getcustomcertificate");
  const zohoApiUrl =
    "https://www.zohoapis.in/creator/v2.1/data/handworkstech/medical-certificate-issuance-system/report/All_Customs/159919000001912037/Custom_Certificate/download";

  try {
    const response = await fetch(zohoApiUrl, {
      method: "GET",
      headers: apiHeaders
    });

    console.log(`Response Status: ${response.statusText}`);
    if (!response.ok) {
      // Handle response errors
      return res.status(response.status).json({
        error: true,
        message: `Failed to fetch data: ${response.statusText}`
      });
    }

    // Extract filename from Content-Disposition header
    const contentDisposition = response.headers.get("content-disposition");
    const filename = contentDisposition
      ? contentDisposition.split("filename=")[1]?.replace(/"/g, "") || "downloaded_file.pdf"
      : "downloaded_file.pdf";

    // Convert response to arrayBuffer for binary data
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Set headers for file download
    res.setHeader("Content-Type", response.headers.get("content-type"));
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Send the binary data as the response
    res.send(buffer);
  } catch (error) {
    console.error("Error fetching Zoho API:", error);
    res.status(500).json({
      error: true,
      message: "An error occurred while fetching data from Zoho API."
    });
  }
});

module.exports = router;
