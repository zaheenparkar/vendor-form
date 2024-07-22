const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection setup
const mongoUrl = process.env.MONGO_URL; // Ensure your .env file has MONGO_URL
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define Mongoose schema and model
const vendorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  firmname: String,
  address: String,
  designation: String,
  GSTNumber: String,
  outlets: Number,
  onlinepresence: String,
  platforms: String,
  feedback: String,
});

const Vendor = mongoose.model("Vendor", vendorSchema);

// Google Sheets setup
const auth = new google.auth.GoogleAuth({
  keyFile: "./keys/vendor-onboarding.json", // Replace with your service account key file path
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const spreadsheetId = "1jEEY49YzRMHibgRKKjsZVyjuk5POHFGtLt4N5PssDY0";

app.post("/api/vendors", async (req, res) => {
  const vendorData = req.body;

  // Insert data into MongoDB
  const vendor = new Vendor(vendorData);
  try {
    const savedVendor = await vendor.save();
    console.log("Data inserted into MongoDB:", savedVendor);

    // Insert data into Google Sheets
    const values = [
      [
        vendorData.name,
        vendorData.email,
        vendorData.phone,
        vendorData.firmname,
        vendorData.address,
        vendorData.designation,
        vendorData.GSTNumber,
        vendorData.outlets,
        vendorData.onlinepresence,
        vendorData.platforms || "",
        vendorData.feedback,
      ],
    ];

    sheets.spreadsheets.values.append(
      {
        spreadsheetId,
        range: "Sheet1!A2",
        valueInputOption: "USER_ENTERED",
        resource: { values },
      },
      (err, result) => {
        if (err) {
          console.error("Error inserting into Google Sheets:", err);
          return res
            .status(500)
            .json({ error: "Google Sheets insertion failed" });
        }
        console.log("Data inserted into Google Sheets:", result.data);
        res.status(200).json({ message: "Data inserted successfully" });
      }
    );
  } catch (err) {
    console.error("Error inserting into MongoDB:", err);
    res.status(500).json({ error: "Database insertion failed" });
  }
});

// Endpoint to fetch vendor data
app.get("/api/vendors", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    console.error("Error fetching vendor data:", err);
    res.status(500).send("Error fetching vendor data");
  }
});

// Endpoint to delete vendor data
app.delete("/api/vendors/:id", async (req, res) => {
  const vendorId = req.params.id;

  try {
    const result = await Vendor.findByIdAndDelete(vendorId);
    if (!result) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    console.log("Vendor deleted from MongoDB:", result);
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (err) {
    console.error("Error deleting vendor from MongoDB:", err);
    res.status(500).json({ error: "Database deletion failed" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
