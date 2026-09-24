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
app.post("/auth/register",async (req,res)=>{
    const result = validateRegisteration.validate(req.body);
    if(result.error){
        throw new ExpressError(StatusCodes.BAD_REQUEST,result.error.message);
    }
    const {name,email,password} = req.body;
    const existingUser = await User.findOne({ email });
    if(existingUser){
        throw new ExpressError(StatusCodes.CONFLICT,"Email Already Exist");
    }
    const hashedPass = await bcrypt.hash(password,10);
    const user = new User({
        name,
        email,
        password : hashedPass
    });
    await user.save();
    const safeUser = {
        name,
        email
    };
    return res.status(StatusCodes.CREATED).json({message : "User Registered",safeUser});
});

// ERROR HANDLING LOGIC
app.use((err,req,res,next)=>{
    const {statusCode = 500 , message = "Internal Server Error"} = err;
    res.status(statusCode).json({
        message
    });
});