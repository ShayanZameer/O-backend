const mongoose = require ("mongoose");


const connectDB =async ()=>{
    try{

        const con =  await mongoose .connect(process.env.MONGODB_URI,{
            // useNewUrlParser: true,
            // useUnifiedTopology:true,
          
        })
        console.log(`MongoDB is connecting  : ${con.connection.host}`)

    }catch(error){
        console.log(`error connecting MONGODB  ${error.message} `)
    }
}


module.exports =connectDB;