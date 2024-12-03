const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config(); // Ensure environment variables are loaded at the start

// Environment Variables
const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;
const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const ZOHO_TOKEN_URL = "https://accounts.zoho.in/oauth/v2/token";
const ZOHO_API_URL =
  "https://www.zohoapis.in/creator/v2.1/data/handworkstech/medical-certificate-issuance-system/report/All_Customs/159919000001912037/Custom_Certificate/download";

// Function to refresh the access token
async function refreshAccessToken() {
  const tokenUrl = `${ZOHO_TOKEN_URL}?refresh_token=${ZOHO_REFRESH_TOKEN}&client_id=${ZOHO_CLIENT_ID}&client_secret=${ZOHO_CLIENT_SECRET}&grant_type=refresh_token`;

  try {
    const response = await fetch(tokenUrl, { method: "POST" });
    const data = await response.json();
console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${data.error}`);
    }

    console.log("Access token refreshed successfully");
    return data.access_token;
  } catch (error) {
    console.error("Error refreshing Zoho access token:", error);
    throw error;
  }
}

// Middleware to handle Zoho API requests
router.get("/", async (req, res) => {
  console.log("getcustomcertificate");

  try {
   
      console.log("Access token refreshing...");
      accessToken = await refreshAccessToken();
      response = await fetch(ZOHO_API_URL, {
        method: "GET",
        headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
      });


    if (!response.ok) {
      return res.status(response.status).json({
        error: true,
        message: `Failed to fetch data: ${response.statusText}`,
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
      message: "An error occurred while fetching data from Zoho API.",
    });
  }
});

module.exports = router;
