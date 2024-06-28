const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// const fechuser= require('../middleware/fetchUser'); 

const bloodController = require('../controllers/bloodController');
const fetchUser = require('../middleware/fetchUser');


router.post('/donate-blood', fetchUser, bloodController.createBloodDonation);

module.exports = router;
