const express =require("express");
const morgan=require("morgan");
const router=require("./routes/route.js")
const cors=require("cors");


const app=express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));//logs every request to the console in dev mode
app.use((req,res,next)=>{
    res.append("Server-Time",new Date().toISOString());
    next();
})
app.use("/api/invoice",router);


module.exports=app;


