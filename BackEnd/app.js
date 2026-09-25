const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { StatusCodes } = require("http-status-codes");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/zoom")
.then(()=>{
    console.log("MONGODB CONNECTED");
})
.catch((err)=>{
    console.log("MONGODB CONNECTION ERROR: ",err);
})
 
app.use(express.json({limit : "100kb"}));
app.use(express.urlencoded({extended:true,limit : "100kb"}));

const PORT = 9090;
app.listen(PORT,()=>{
    console.log(`APP IS LISTENING TO ${PORT}`);
});

app.get("/",(req,res)=>{
    res.status(StatusCodes.OK).json({message : "Currently on Home Tab"
    });
});

const authRoutes = require("./routes/authRoutes");
app.use("/auth",authRoutes);


// ERROR HANDLING LOGIC
app.use((err,req,res,next)=>{
    const {statusCode = 500 , message = "Internal Server Error"} = err;
    res.status(statusCode).json({
        message
    });
});