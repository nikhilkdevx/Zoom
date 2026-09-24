const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const User = require("./Models/user");
const bcrypt = require("bcrypt");
const ExpressError = require("./utilis/ExpressError");
const { StatusCodes } = require("http-status-codes");

const validateRegisteration = require("./Validators/validateRegisteration");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/zoom")
.then(()=>{
    console.log("MONGODB CONNECTED");
})
.catch((err)=>{
    console.log("MONGODB CONNECTION ERROR: ",err);
})
 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = 9090;
app.listen(PORT,()=>{
    console.log(`APP IS LISTENING TO ${PORT}`);
});

app.get("/",(req,res)=>{
    res.status(StatusCodes.OK).json({message : "Currently on Home Tab"
    });
});

// app.use("/auth",authRoutes);


// ERROR HANDLING LOGIC
app.use((err,req,res,next)=>{
    const {statusCode = 500 , message = "Internal Server Error"} = err;
    res.status(statusCode).json({
        message
    });
});