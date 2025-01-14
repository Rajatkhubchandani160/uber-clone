const express=require('express');
const route=express.Router()
const {userValidationRules,userRegister,userLogin, userLoginValidationRules,userProfile,userLogout}=require('../controllers/userController')
const {uservalidate}=require('../middlewares/userAuth')


route.post('/register',userValidationRules,userRegister)
route.post('/login',userLoginValidationRules,userLogin);
route.get('/profile',uservalidate,userProfile)
route.post('/logout',uservalidate,userLogout);
module.exports=route

