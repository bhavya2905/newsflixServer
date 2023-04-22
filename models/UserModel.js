import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    likedMovies:Array
})



export default mongoose.model("users",userSchema);