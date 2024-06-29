const BloodDonation = require('../models/Blood');
const User = require('../models/User'); // Assuming your user model is imported here
const { validationResult } = require('express-validator');

// Controller function to create a new blood donation record
exports.createBloodDonation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure the required fields from the request body
  const { blood_group, date_of_birth, gender, last_donation_date, description } = req.body;

  try {
    // Fetch user details to get the phone number
    const user = await User.findById(req.user.id);
    

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { phoneNumber } = user;

    console.log(user);
    const donorName= user.firstName + user.lastName;

    const status = "pending";

    const newDonation = new BloodDonation({
      user_id: req.user.id, 
      blood_group,
      date_of_birth,
      gender,
      last_donation_date,
      description,
      phoneNumber ,
      donorName,
      status: status
    });

    await newDonation.save();

    res.status(201).json({ message: 'Blood donation record created successfully', donation: newDonation });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
