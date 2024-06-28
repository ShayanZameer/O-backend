const mongoose = require("mongoose");
const Schema= mongoose.Schema;


const BloodDonationSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    blood_group: { type: String, required: true }, // Blood group of the donor
    date_of_birth: { type: Date, required: true }, // Date of birth of the donor
    gender: { type: String, enum: ['male', 'female', 'other'], required: true }, // Gender of the donor
    last_donation_date: { type: Date }, // Date of last donation
  });
  
  module.exports = mongoose.model('BloodDonation', BloodDonationSchema);