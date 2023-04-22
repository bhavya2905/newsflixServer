import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   id:{
    type:String
   },
   superAdmin:{
    type:Number
   }
})



export default mongoose.model("adminUsers",adminUserSchema);