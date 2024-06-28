const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const medicineController = require('../controllers/medicineController');
const multer = require('multer');



const bloodController = require('../controllers/bloodController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })




router.post('/donate-medicine',upload.single('image'), fetchUser, medicineController.createMedicine);
router.get('/all-medicines', fetchUser, medicineController.getAllMedicines); 


module.exports = router;



