import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    googleId:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
    }
})

const User=mongoose.model("User",userSchema);
export default User;