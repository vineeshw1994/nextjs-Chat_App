import getPrismaInstance from '../utils/PrismaClient.js'
export const checkUser = async(req, res,next) => {
    try{
  const {email} = req.body;
  if(!email){
    return res.json({msg:"Email is required", status:false})
  }
  const prisma = getPrismaInstance();
  const user = await prisma.user.findUnique({
      where:{
          email:email
      }
  })
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