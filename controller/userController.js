import User from "../schemas/userSchema.js";
import asyncHandler from "express-async-handler";

export const createUser = asyncHandler(async(req,res)=>{
    try{
        const { email, username, password, phone } = req.body;
    const userDoc = await User.findOne({ $or: [{ email }, { phone }] });
    console.log(userDoc);
    if (userDoc) {
      return res
        .status(409)
        .json({ userDoc, success: false, msg: "User Already Exist" });
    }
    const user = await User.create({
      email,
      username,
      password,
      phone,
      role,
    });
    return res.status(200).json({
      user,
      success: true,
      msg: "",
    });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,error});
    }
})