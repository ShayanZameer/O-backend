const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');

const MedicineDonation = require('../models/Medicine');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });




const uploadToCloudinary = async (file) => {
    console.log("Starting upload to Cloudinary...");
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "auto" }, // Use 'auto' to automatically determine the resource type (image, video, etc.)
        (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            reject(error);
          } else {
            console.log("Successfully uploaded to Cloudinary:", result.secure_url);
            resolve(result.secure_url);
          }
        }
      ).end(file.buffer);
    });
  };
  


exports.createMedicine = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure the required fields from the request body
  const { medicineName, quantity, expiryDate, description } = req.body;
  console.log("ahdkfh")

  console.log(req.body)



  try {


let imageUrl="";

if(req.file){

    const cloudinaryUrl = await uploadToCloudinary(req.file);
        imageUrl = cloudinaryUrl;

}
    const newDonation = new MedicineDonation({
      user_id: req.user.id,
      medicineName,
      quantity,
      expiryDate,
      description,
      image: imageUrl || '', 
    });

    await newDonation.save();

    res.status(201).json({ message: 'Medicine donation record created successfully', donation: newDonation });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


exports.getAllMedicines = async (req, res) => {
    try {
        const medicines = await MedicineDonation.find().populate('user_id', 'name email phoneNumber');
        res.status(200).json(medicines);
    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).send('Server error');
    }
};
