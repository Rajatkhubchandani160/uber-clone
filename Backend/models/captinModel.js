const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const captinSchema = mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3, "plese enter 3 or more than 3 letters"],
            lowercase:true
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
        unique:true,
    },
    password:{
        type:String,
        minlength:[5,"please provide the minimum 5 characters"],
        select:false
    },
    socketid:{
        type:String
    },
    isAvailable:{
        type:Boolean,
        enum:[true,false],
        default:true
    },
    vehicle:{
        color:{
            type:String,
            required:true
        },
        type:{
            type:String,
            enum:['car','motorcycle','auto'],
            required:true
        },
        vehicle_no:{
            type:String,
            required:true
        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1,"please provide the minimum 1 capacity"]
        }
    },
    location:{
        type:{
            type:String,
            enum:['Point'],
            required:true,
            default:'Point'
        },
        coordinates:{
            latitude:{
            type:Number,
            required:true
            },
            longitude:{
            type:Number,
            required:true
            }
        }
    }
})

captinSchema.statics.hashpassword=function(password){
    const hashedPassword=  bcrypt.hash(password,10)
    return hashedPassword
}
captinSchema.statics.comparePassword = async function (plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
};

captinSchema.methods.generateToken=function(){
    const token=jwt.sign({id:this._id},process.env.SECRET,{expiresIn:'24h'})
    return token
}

const captin=mongoose.model('captin_info',captinSchema)
module.exports=captin;