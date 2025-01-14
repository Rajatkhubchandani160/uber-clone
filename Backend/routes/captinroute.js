const express=require('express');
const route=express.Router()
const {captinRegister,registerValidation,loginValidation,captinLogin, captinProfile, captinLogout}=require('../controllers/captinController');

route.get('/',(req,res)=>{
    res.send("Here is your captin")
})

route.post('/register',registerValidation,captinRegister)
route.post('/login',loginValidation,captinLogin)
route.post('/profile',captinProfile)
route.post('/logout',captinLogout)



module.exports=route

