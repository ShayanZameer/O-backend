const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

console.log(JWT_SECRET);


const fetchUser = (req, res, next)=>{

    const token = req.header("auth-token");


    if(!token){
        res.status(401).send({error:"please authenticate a token"})
        return;
    }

    try{

        const data = jwt.verify(token, JWT_SECRET);

        req.user= data.user;

        next();

    }catch(error){
        res.status(401).send({error:" please authenticate a valid token"});
        return;
    }

    
};


module.exports= fetchUser;



