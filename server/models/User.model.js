import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    about:{
        type:String,
        default:""
    },
    profilePicture:{
        type:String,
        default:""
    }
})

const User = mongoose.model('User',userSchema)

export default User;