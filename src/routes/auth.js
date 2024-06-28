const express = require("express");

const {body} =  require ("express-validator");


const router = express.Router();
const authController = require('../controllers/authController');



//  routes

router.post('/signup', [body('firstName').isLength({ min: 3 })],authController.signUp);

router.post('/login', authController.login);

router.post('/forgot-password', authController.forgetPassword);

router.get("/reset-password", authController.resetPassword)



module.exports= router;