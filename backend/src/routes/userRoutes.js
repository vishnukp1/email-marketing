
const express=require("express")
const router=express.Router()
const userController=require("../controllers/userController")
const tryCatch = require("../middlewares/tryCatch")


router
.post("/register",tryCatch(userController.userRegister))

.post("/login", tryCatch(userController.userLogin));

module.exports=router