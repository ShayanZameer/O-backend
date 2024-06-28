const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const cartController = require('../controllers/cartController');

router.post('/add-to-cart', fetchUser, cartController.addToCart); // New route

router.get('/display-cart', fetchUser, cartController.getCart); 
router.delete('/cart/:medicine_id', fetchUser, cartController.removeFromCart); // New route



module.exports = router;


