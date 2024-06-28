const BloodDonation = require('../models/Blood');
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
    // Create a new instance of BloodDonation with the provided data
    const newDonation = new BloodDonation({
      user_id: req.user.id, // Assuming user_id is available in req.user.id (from authentication middleware)
      blood_group,
      date_of_birth,
      gender,
      last_donation_date,
      description
    });

    // Save the new donation record to the database
    await newDonation.save();

    // Respond with a success message and the created donation object
    res.status(201).json({ message: 'Blood donation record created successfully', donation: newDonation });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
