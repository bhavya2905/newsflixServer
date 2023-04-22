import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    email:{
        type:String,
        default: ''
    },
    health:{
        type:Number,
        default:0
    },
    sports:{
        type:Number,
        default:0
    },
    politics:{
        type:Number,
        default:0
    },
    weather:{
        type:Number,
        default:0
    },
    
});

export default mongoose.model("categoryCount",categorySchema);