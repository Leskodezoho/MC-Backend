const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const fs = require("fs");
const FormData = require('form-data'); // Ensure you install this package: npm install form-data

dotenv.config();

const router = express.Router();

// Set up Multer for file upload
const upload = multer({ dest: "./uploads/" }); // Temporary folder for uploaded files

// Function to refresh the access token
async function refreshAccessToken() {
  const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;
  const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID;
  const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
  const ZOHO_TOKEN_URL = "https://accounts.zoho.in/oauth/v2/token";

  const tokenUrl = `${ZOHO_TOKEN_URL}?refresh_token=${ZOHO_REFRESH_TOKEN}&client_id=${ZOHO_CLIENT_ID}&client_secret=${ZOHO_CLIENT_SECRET}&grant_type=refresh_token`;

  try {
    const response = await fetch(tokenUrl, { method: "POST" });
    const data = await response.json();

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

// Middleware to handle Zoho API file upload
router.post("/", upload.single("filePath"), async (req, res) => {
  const { recordId } = req.body;
  const filePath = req.file?.path;

  console.log("Record ID:", recordId);
  console.log("File Path:", filePath);

  // Validate input
  if (!filePath || !recordId) {
    return res.status(400).json({
      error: true,
      message: "Missing required fields: filePath and/or recordId.",
    });
  }

  try {
    // Hardcoded URL components
    const baseUrl = "https://www.zohoapis.in";
    const accountOwnerName = "handworkstech";
    const appLinkName = "medical-certificate-issuance-system";
    const reportName = "All_Medical_Certificatest";
    const fieldName = "Updated_Custom_Format";

    // Construct the upload URL
    const ZOHO_API_URL = `${baseUrl}/creator/v2.1/data/${accountOwnerName}/${appLinkName}/report/${reportName}/${recordId}/${fieldName}/upload`;

    console.log("Zoho API Upload URL:", ZOHO_API_URL);

    // Refresh access token
    const accessToken = await refreshAccessToken();

    // Prepare the file upload request using FormData
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath), { filename: 'manual.pdf' }); // Adjust filename as needed

    // Add additional query parameters to the URL if needed
    const queryParameters = "?skip_workflow=[\"schedules\",\"form_workflow\"]";
    const apiUrlWithParams = `${ZOHO_API_URL}${queryParameters}`;

    // Upload the file to Zoho
    const response = await fetch(apiUrlWithParams, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        ...formData.getHeaders(), // Merge FormData headers
      },
      body: formData,
    });
console.log(response);
    if (!response.ok) {
      const responseData = await response.json();
      return res.status(response.status).json({
        error: true,
        message: `Failed to upload file: ${responseData.message}`,
      });
    }

    const responseData = await response.json();
    res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Error uploading file to Zoho API:", error);
    res.status(500).json({
      error: true,
      message: "An error occurred while uploading file to Zoho API.",
    });
  } finally {
    // Clean up the temporary uploaded file
    if (filePath) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting temporary file:", err);
      });
    }
  }
});

module.exports = router;
