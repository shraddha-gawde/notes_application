const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { userModel } = require("../models/user.model")

const userRouter = express.Router()


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
    const {email, password} = req.body
    try{
        const user = await userModel.findOne({email})
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

                    res.status(200).json({msg:"Login successful!", access_token, refresh_token})
                }
                else{
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

module.exports={
    userRouter
}

