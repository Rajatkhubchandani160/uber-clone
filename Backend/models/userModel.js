const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userSchema=mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3, "plese enter 3 or more than 3 letters"]
        },
        lastname:{
            type:String,
            minlength:[3, "plese enter 3 or more than 3 letters"],
            default:" "
        }
    },
    email:{
        type:String,
        minlength:[11,"The minimum letter must be 11"],
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:[5,"please provide the minimum 5 characters"]
    },
    socketid:{
        type:String
    }
})

userSchema.methods.hashpassword=function(password){
    const hashedPassword=  bcrypt.hash(password,10)
    return hashedPassword
}
userSchema.methods.comparePassword=function(password){
    return bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken=function(){
    const token=jwt.sign({id:this._id},process.env.SECRET)
    return token
}
const User = mongoose.model('user_info', userSchema);
module.exports = User;
