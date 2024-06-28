

const User = require("../models/User");

const {validationResult }= require ("express-validator");

const bcrypt= require("bcryptjs");
const jwt = require ("jsonwebtoken");

const emailUser = process.env.Email_User;
const emailPassword = process.env.Email_Password;
// const emailPassword = "alizadi2";

const nodemailer = require("nodemailer");

const randomstring = require("randomstring");

const JWT_SECRET= process.env.JWT_SECRET;

exports.signUp= async (req, res)=>{

    try{
      console.log("fuck");
        let success = false;


        const  errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success, errors:errors.array()});
        }


        let user = await User.findOne({email:req.body.email});

        if(user){
            return res.status(400).json({success, errors:"Soory user already exists"});
        }

        const salt= await bcrypt.genSalt(10);

        const secPass= await bcrypt.hash(req.body.password,salt);


        user = new User({

            firstName: req.body.firstName,
            lastName: req.body.lastName,

            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: secPass,
            gender: req.body.gender



        }) 

        await user.save();

        const data = {
            user:{
                id: user.id,
            }, 
        };

        const  authToken = jwt .sign (data, JWT_SECRET);

        success= true;

        res.json ({success, authToken})


    }

    catch(error){
        console.log(error)
    }

}

//for Login


exports.login = async (req, res)=>{

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success, error: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(payload, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }


}





const sendResetPasswordMail = async (name, email, token) => {
    try {
      const transporter = nodemailer.createTransport({

        // host: "smtp.gmail.com",
  
        // port: 587,
        // secure: true,
        // secureConnection:false,
        // requiresAuth: true,
        // domains: ["gmail.com", "googlemail.com"],
        host: "smtp.gmail.com",
port: 587,
secure: true, 
requireTLS: true,
// logger: true,
// debug: true,

  
        auth: { user: emailUser, pass: emailPassword },
        
      });
      const mailOptions = {
        from: emailUser,
        to: email,
        subject: "for reset password",
        html:
          "<p> Hii " +
          name +
          ", please copy the link and <a href='http://localhost:5000/api/auth/reset-password?token=" +
          token +
          "'>reset your password</a></p> ",
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) { 
            // console.log(info.messageId)
          console.log(
            error + " there is some error in Sending mail check please "
          );
        } else {
          console.log("Mail has been set" + info.response);
        }
      });
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  };


  exports.forgetPassword= async (req,res)=>{
try{
    const email= req.body.email;
    const userData = await User.findOne({email:email});

    if(userData){
        const rstring= randomstring.generate();


        const data = await User.updateOne(
            {email:email},
            {$set:{token: rstring}}
        );
        sendResetPasswordMail(userData.name, userData.email, rstring);
        res.status(200).send({
            success: true,
            msg: "Please Check you email for messeage and reset you password ",
          });

    }else{
        res.status(200).send({ success: true, msg: "This email doesnot exist" });

    }

  }
catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}




exports.resetPassword= async(req, res)=>{

  try {
    const token = req.query.token;

    const userData = await User.findOne({ token: token });

    if (userData) {
      const password = req.body.password;

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      const newUser = await User.findByIdAndUpdate(
        { _id: userData._id },
        { $set: { password: secPass, token: "" } },
        { new: true }
      );

      res.status(200).send({
        success: true,
        msg: "User password ha change  ",
        data: newUser,
      });
    } else {
      res.status(200).send({ success: true, msg: "LINK HAS EXPIRE " });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: "hhhhhh" });
  }

}






