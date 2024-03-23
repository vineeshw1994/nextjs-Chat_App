import getPrismaInstance from '../utils/PrismaClient.js'
import User from '../models/User.model.js'
export const checkUser = async(req, res,next) => {
    try{
  const {email} = req.body;
  if(!email){
    return res.json({msg:"Email is required", status:false})
  }
  const user = await User.findOne({email});
  console.log(user)
  if(!user){
      res.json({msg:"User not found", status:false})
  }else{
    res.json({msg:"User found", status:true, data:user})
  }
    }catch(error){
        next(error)
    }
}

export const onBoardUser = async(req, res,next) => {
console.log('this is onboard user')
  try{
  const {email, name, about,image} = req.body;
  console.log(req.body)
  if( !email || !name || !about || !image){
    return res.json({msg:"All fields are required", status:false})
  }
  const user = await User.create({
      email,
      name,
      about,
      profilePicture:image
  })
  console.log(user)
  await user.save();
  res.json({msg:"User created successfully",data:user, status:true})
  }catch(error){
    next(error)
  }
}