const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    image: String,
    name:String,
    color:String,
    price:String,
    description:String,
    
})
module.exports=mongoose.model("User",userSchema)