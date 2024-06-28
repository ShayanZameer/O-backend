// const mongoose = require("mongoose");


// const {Schema} = mongoose.Schema;


// const MedicineDonationSchema = new Schema({
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
//     medicine_name: { type: String, required: true }, // Name of the medicine
//     quantity: { type: Number, required: true }, // Quantity of the medicine
//     expiry_date: { type: Date, required: true }, // Expiry date of the medicine
//     description: { type: String, required: true }, // Description of the medicine
//     image: { type: String, required: true },
//     phoneNumber:{type:String,required:true} // Image of the medicine (URL or path to the image file)
//   });
  
//   module.exports = mongoose.model('MedicineDonation', MedicineDonationSchema);


const { Schema, model } = require('mongoose');

const MedicineDonationSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    medicineName: { type: String, required: true }, // Name of the medicine
    quantity: { type: Number, required: true }, // Quantity of the medicine
    expiryDate: { type: Date, required: true }, // Expiry date of the medicine
    description: { type: String, required: true }, // Description of the medicine
    image: { type: String, required: true },
});

module.exports = model('MedicineDonation', MedicineDonationSchema);
