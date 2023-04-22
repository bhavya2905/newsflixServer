import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    caption:{type:String},
    selectedFile :{type:String},
    comments: {
        type:[String],
        default: []
    },
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default: new Date()
    }
    
});

export default mongoose.model("articles",articleSchema);