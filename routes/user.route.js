const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { blacklistModel } = require("../models/blacklist.model");
const { userModel } = require("../models/user.model")

const userRouter = express.Router()

userRouter.get("/", auth, async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json({ notes_data: note });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  });

userRouter.post("/register", async(req, res)=>{
    const {username, email, password, role} = req.body
    try{
        if(!/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*()_+{}[;]/.test(password) || password.length < 8){
            return res.status(400).json({msg: "cannot register"})
            
        }
        const existUser = await userModel.findOne({email})
        if(existUser){
            return res.status(400).json({msg: "Already Exists"})
        }
        bcrypt.hash(password, 10, async(err, hash)=>{
            
                const user = new userModel({username,email,password:hash,role})
                await user.save()
                res.status(200).json({msg: "The new user has been registered",registeredUser:user})
            }
        )
    }catch(err){
        
        res.status(400).json({error:err})
    }
})


userRouter.post("/login", async(req,res)=>{
    const {username, email, password, } = req.body
    try{
        const user = await userModel.findOne({email})
        const name = user.username
        console.log(user)
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(err){
                    res.status(200).json({msg:"user Does not exists!!!"})
                }
                if(result){
                    const access_token = jwt.sign({ userID:user._id , username:user.username}, "shraddhaBooks", {expiresIn : "7d"});
                    const refresh_token = jwt.sign({ userID:user._id , username:user.username}, "shraddhaBooks",{ expiresIn : "14d"});
                    
                    res.cookie("access_token", access_token, {httpOnly: true})
                    res.cookie("refresh_token", refresh_token, {httpOnly: true})

                    res.status(200).json({msg:"Login successful!", name, access_token, refresh_token})
                }
                else{
                    window.alert("user Does not exists!!!")
                    res.status(200).json({msg:"user Does not exists!!!"})
                }
            })
        }else{
            res.status(200).json({msg:"user Does not exists!!!"})
        }
    }catch(err){
        res.status(400).json({error:err})
    }
})
userRouter.get("/logout", async (req, res) => {
    const access_token = req.cookies.access_token;
    const refresh_token = req.cookies.refresh_token;
  
    try {
      const blacklist = new blacklistModel({ access_token, refresh_token });
      await blacklist.save();
  
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
  
      res.status(200).json({ msg: "User has been logged out" });
    } catch (err) {
      res.status(400).json({ error:err});
    }
  });

module.exports={
    userRouter
}

