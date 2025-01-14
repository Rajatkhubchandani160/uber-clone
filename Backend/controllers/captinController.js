const { body,validationResult } = require('express-validator')
const captinModel=require('../models/captinModel')
const jwt=require('jsonwebtoken')

const registerValidation=[
    body('fullname.firstname')
    .isString()
    .withMessage('Firstname must be a string.')
    .isLength({ min: 3 })
    .withMessage('Firstname must be at least 3 characters long.'),  
    body('fullname.lastname').isString().withMessage('Lastname must be a string.').isLength({ min: 3 }).withMessage('Lastname must be at least 3 characters long if provided.'),
    body('email').isEmail().withMessage('Email must be valid.').isLength({ min: 11 }).withMessage('Email must be at least 11 characters long.'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.'),
    body('location.coordinates.latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a number between -90 and 90.'),
    body('location.coordinates.longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a number between -180 and 180.'),
    body('vehicle.color').isString().withMessage('Color must be a string.').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long.'),
    body('vehicle.type').isString().withMessage('Type must be a string.').isIn(['car', 'motorcycle', 'auto']).withMessage('Type must be either car, motorcycle, or auto.'),
    body('vehicle.vehicle_no').isString().withMessage('Vehicle number must be a string.').isLength({ min: 3 }).withMessage('Vehicle number must be at least 3 characters long.'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be an integer greater than 0.'),
    body('isAvailable').isBoolean().withMessage('Availability must be a boolean.')
]
const loginValidation=[
    body('email').isEmail().withMessage('Email must be valid.').isLength({ min: 11 }).withMessage('Email must be at least 11 characters long.'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.')
]
const  captinRegister=async(req,res)=>{
    try{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message:'Validation errors',errors:errors.array()})
    }
    const {fullname,email,password,isAvailable,location,vehicle}=req.body
    const existingCaptin=await captinModel.findOne({email})
    if(existingCaptin){
        return res.status(400).json({message:'Email is already in use.'})
    }
    const hashedPassword=await captinModel.hashpassword(password)
    const captin=await captinModel.create({
        fullname:{
            firstname:fullname.firstname,
            lastname:fullname.lastname || ' '
        },
        email:email,
        password:hashedPassword,
        isAvailable:isAvailable,
        location:{
            type:location.type,
            coordinates:{
                latitude:location.coordinates.latitude,
                longitude:location.coordinates.longitude
            }
        },
        vehicle:{
            color:vehicle.color,
            type:vehicle.type,
            vehicle_no:vehicle.vehicle_no,
            capacity:vehicle.capacity
        }
    })
    res.status(201).json({
        message:'Captin created successfully',
        data:captin
    })

}
    catch(err){
        res.status(400).json({message:
            'Unable to create the captin',
        })
        console.log(err)
    }
}
const captinLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation errors', errors: errors.array() });
        }

        const { email, password } = req.body;

        const existingCaptin = await captinModel.findOne({ email }).select('+password');
        if (!existingCaptin) {
            return res.status(404).json({ message: 'Captin not found' });
        }

        const isMatch = await captinModel.comparePassword(password, existingCaptin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = existingCaptin.generateToken();
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({
            message: 'Captin logged in successfully',
            data: {
                id: existingCaptin._id,
                fullname: existingCaptin.fullname,
                email: existingCaptin.email,
            },
            token,
        });
    } catch (err) {
        res.status(400).json({ message: 'Unable to login the captin' });
        console.error(err);
    }
};
const captinProfile = async (req, res) => {
    try{
        const token=req.cookies.token || req.headers.authorisation.split(' ')[1]

        if(!token){
            res.status(400).json({
                message:"Unauthorised Access"
            })
        }


        const decoded=jwt.verify(token,process.env.SECRET)

        const captin=await captinModel.findOne({_id:decoded.id})

        if(!captin){
            res.status(400).json({
                message:"Captin not found"
            })
        }
         res.status(200).json({
            message:"Profile Details",
            data:captin
         })
    }
    catch(err){
        res.status(400).json({
            message:"Unauthorised Access",
            error:err
        })
        console.log(err)
    }
}
const captinLogout = async (req, res) => {
   try{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'Unauthorised access' });
    }
    res.clearCookie('token');
    res.status(200).json({ message: 'Captin logged out successfully' });
   }
   catch(err){
    res.status(400).json({
        message:"User not Login",
        error:err
    })
   }


}


module.exports={registerValidation,captinRegister,loginValidation,captinLogin,captinProfile,captinLogout}


