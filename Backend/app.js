const dotenv=require('dotenv')
dotenv.config()

const express=require('express')
const userRoute=require('../Backend/routes/userroute')
const captinRoute=require('../Backend/routes/captinroute')
const app=express()
const cors=require('cors');
const port=process.env.PORT || 3000
const connectToDb =require('../Backend/config/db')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
connectToDb()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/user',userRoute);
app.use('/captin',captinRoute)



app.listen(port,()=>{
    console.log(`Connected to port ${[port]}`);
})