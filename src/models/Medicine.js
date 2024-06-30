const { Schema, model } = require('mongoose');

const MedicineDonationSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    donorName:{type:String, required:true},
    medicineName: { type: String, required: true }, 
    quantity: { type: Number, required: true }, 
    expiryDate: { type: Date, required: true }, 
    description: { type: String, required: true }, 
    image: { type: String, required: true },
    status:{
        type : String,
        enum:["pending","donated"],
},
isExpired: { type: Boolean, default: false } // Add this field if needed

});

module.exports = model('MedicineDonation', MedicineDonationSchema);
