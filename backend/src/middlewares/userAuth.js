require('dotenv').config();
const jwt=require("jsonwebtoken")

module.exports= verifyToken=(req,res,next)=>{
const token=req.headers[ "authorization"] 

if(!token){
    return res.status(403).json({error:"Token is not provided"})
}
jwt.verify(token,process.env.USER_ACCES_TOKEN_SECRET,(err,decode)=>{
   
    if(err){
    return res.status(401).json({error:"Unauthorized"}) 
    }
    req.email=decode.email

    next()
})
}