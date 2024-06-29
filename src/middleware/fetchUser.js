const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

console.log(JWT_SECRET);


const fetchUser = (req, res, next)=>{

    // const token = req.header("auth-token");
    const token = req.header('Authorization').replace('Bearer ', '');


    if(!token){
        res.status(401).send({error:"please authenticate a toke"})
    }

    try{

        const data = jwt.verify(token, JWT_SECRET);

        req.user= data.user;

        next();

    }catch(error){
        res.status(401).send({error:" please authenticate a valid token"})
    }

    
};


module.exports= fetchUser;



