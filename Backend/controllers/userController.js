const { body, validationResult } = require('express-validator');
const userModel = require('../models/userModel');
  
const userValidationRules = [
    body('fullname.firstname')
        .isString()
        .withMessage('Firstname must be a string.')
        .isLength({ min: 3 })
        .withMessage('Firstname must be at least 3 characters long.'),
    body('fullname.lastname')
        .optional()
        .isString()
        .withMessage('Lastname must be a string.')
        .isLength({ min: 3 })
        .withMessage('Lastname must be at least 3 characters long if provided.'),
    body('email')
        .isEmail()
        .withMessage('Email must be valid.')
        .isLength({ min: 11 })
        .withMessage('Email must be at least 11 characters long.'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long.'),
];

const userLoginValidationRules = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid.')
        .isLength({ min: 11 })
        .withMessage('Email must be at least 11 characters long.'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long.'),
]

const userRegister = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation errors', errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }

        const user = new userModel({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname || ' '
            },
            email,
            password,
        });

        user.password = await user.hashpassword(password);

        await user.save();

        const token = user.generateToken();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                firstname: user.fullname.firstname,
                lastname: user.fullname.lastname,
                email: user.email,
            },
            token : token,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const userLogin = async (req, res) => {
    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation errors', errors: errors.array() });
        }

      const {email,password}=req.body
      const user=await userModel.findOne({email:email});
      if(!user){
        return res.status(400).json({
            message:"user or email is invalid"
        })
      }
      const match=await user.comparePassword(password,existingUser.password);    

      if(!match){
        res.status(400).json({
            massage:"email or password is invalid"
        })
      }

      const token=user.generateToken();
      res.cookie('token',token)
      
      res.status(200).json({
          message:"User login successfully",
          user:{
              id:user._id,
              firstname:user.fullname.firstname,
              lastname:user.fullname.lastname,
              email:user.email
          },
          token:token
      })
      
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:'Internal Server Error',error:error.message});
    }

}

const userProfile=async(req,res)=>{
    try{
        res.status(200).json({data:req.user})
    }
    catch(error){
        console.error(error);
        res.status(401).json({message:'Unauthorised access',error:error.message});
    }
}

const userLogout=async(req,res)=>{
    try{
        const token=req.cookies.token || req.headers.authorization?.split(' ')[1];   
        res.clearCookie('token');
        await blacklistTokenModel.create({token});

        res.status(200).json({message:"User logout successfully"})

    }
    catch(err){
        res.status(404).json({message:"User not found",error:err.message})  
    }
}

module.exports = { userRegister,userLogin, userValidationRules ,userLoginValidationRules,userProfile,userLogout};
