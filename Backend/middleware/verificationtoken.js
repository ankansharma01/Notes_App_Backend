const jwt = require('jsonwebtoken');
const user_Model= require('../Models/UserAuthModel');


const restrictToLogin = async (req,res,next)=>{
     token=req.cookies.token;
    if(!token)
    {
        res.status(400).json({message:"User Not Found"});
    }
    const decoded = jwt.decode(token,process.env.SECRET_KEY )
     const user = await user_Model.findById(decoded.userId);
     if(!user)
     {
        res.status(400).json({message:"user not found"});

     }
     req.userId = user._id;
     next()
    

}

module.exports = restrictToLogin;