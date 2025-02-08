const express = require("express");
const UserModel = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS),
      async (err, hash) => {
        if (err) {
          res.status(400).json({ msg: `${err}` });
        } else {
          const user = new UserModel({ name, email, password: hash });
          await user.save();
          res.status(200).json({ msg: `user registered`, user });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ msg: `${error}`, error });
  }
});
userRouter.get("/users", async (req, res) => {
  try {
    const user = await UserModel.find().populate("products");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: `error`, error });
  }
});
//login
userRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body
   try {
    const matchingUser = await UserModel.findOne({email})
    bcrypt.compare(password, matchingUser.password , async(err, result) => {
    if(result){
        const token = jwt.sign({userId:matchingUser._id,user:matchingUser.name},process.env.SECRET_KEY)
        res.status(200).json({ msg: `Login successfull`,token });   
    }else{
        res.status(400).json({ msg: `${err}` });
    }
    })
   } catch (error) {
    res.status(500).json({ msg: `${error}`, error });
   }
})
module.exports = userRouter;
