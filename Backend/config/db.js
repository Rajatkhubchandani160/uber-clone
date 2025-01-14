const mongoose=require('mongoose');

const coonectToDb=()=>{
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("connected to Database");
    }).catch((err)=>{
        console.log(`error is ${err}`)
    })
}

module.exports=coonectToDb