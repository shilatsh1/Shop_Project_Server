import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const resetUsersService = async (usersFromJson)=> {
  await User.deleteMany({});
  const usersWithHashedPasswords = await Promise.all(usersFromJson.map(async (user) => 
    {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      return {
        ...user,
        password: hashedPassword
      };
    })
  );
  return await User.insertMany(usersWithHashedPasswords);
};

export const findUsersService= async ()=>{
    return await User.find({});
};

export const findUserByIdService= async (id)=>{
    return await User.findOne({ _id:id });
};

export const registerUserService = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const newUser = new User({...userData, password: hashedPassword,});
  const savedUser= await newUser.save();

  const token=jwt.sign({sub:savedUser._id, email: savedUser.email,},process.env.JWT_SECRET, {expiresIn: "7d"});
  const userObj=savedUser.toObject();
  delete userObj.password ;
  return {user:userObj, token};
};

export const updateUserService = async (id, updateData) => {
  return await User.findByIdAndUpdate({ _id:id }, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteUserByIdService = async (id) => {
  return await User.findByIdAndDelete({ _id:id });
};

export const deleteUsersService= async ()=>{
    return await User.deleteMany({});
};

export const loginUserService = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token=jwt.sign({sub:user._id, email: user.email,},process.env.JWT_SECRET, {expiresIn: "7d"});
  const userObj=user.toObject();
  delete userObj.password ;
  return {user:userObj, token};
};

export const changePasswordService = async (email, oldPassword, newPassword) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) return null;
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return null;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  return await user.save();
};
