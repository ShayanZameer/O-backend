const mongoose = require ("mongoose");


const Schema = mongoose.Schema;


const userSchema = new Schema ({
    firstName:{
        type: String,
        required: true,
        trim: true
    },

    lastName:{

        type: String,
        required: true,
        trim: true

    },
    email:{
        type:String,
        required: true,
        trim: true,
        unique: true
    },
    phoneNumber:{
        type: Number,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },


    gender: {
         type : String,
         enum: ['male','female','other'],
         required: true 
    }
 
});


const User = mongoose.model("User", userSchema);

module.exports= User;

