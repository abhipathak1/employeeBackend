const {UserModel} = require('../Models/User.model')
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRoute = express.Router()


userRoute.post('/register',async(req, res)=>{
    const {email,pass} = req.body
    try{
        const existingUser = await UserModel.findOne({email})
        if(existingUser){
            return res.status(500).json({msg:'User Already Registerd'})
        }
        bcrypt.hash(pass,5,async(req,hash)=>{
            const user = new UserModel({email,pass:hash})
            await user.save()
            res.status(201).json({msg:'Register Successfull!'})
        })
    }catch(err){
        res.status(500).json({error:'Not register'})
    }
})

userRoute.post('/login', async(req, res)=>{
    const {email,pass} =req.body;
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user._id},'EmployeeManagment')
                    res.status(200).json({msg:'Login Success!', 'token':token})
                }else{
                    res.status(401).json('Wrong Password')
                }
            })
        }else{
            res.status(401).json('Wrong Password')

        }
    }catch(err){
        res.status(401).json(err)
    }
})

module.exports = {userRoute}