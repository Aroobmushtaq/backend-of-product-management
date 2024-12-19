const express=require("express")
const {createUser,getUser,deleteUsre,updateUser}=require("../controller/userController")
const userRoutes=express.Router()
const upload=require("../middelware/multerConfig")
userRoutes.post("/", upload.single("image"), createUser); 
userRoutes.get("/", getUser)
userRoutes.delete("/:id",deleteUsre )
userRoutes.patch("/:id",updateUser )
module.exports=userRoutes