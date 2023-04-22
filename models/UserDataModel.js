import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    gender:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
    },
    address:{
        type:String,
    },
    preferences:{
        type:String,
    },
    isAdmin:{
        type:Number,
    }
})



export default mongoose.model("userdatas",userDataSchema);