const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const User = require("./Models/user");
const register = require("./Validators/reg");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.1:27017/zoom")
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
    res.json({message : "Currently on Home Tab"
    });
});

// app.use("/auth",authRoutes);
app.post("/auth/register",(req,res)=>{
    const result = req.body;

})
// ERROR HANDLING LOGIC
app.use((err,req,res,next)=>{
    console.log(err);

    res.status(500).json({
        message: "Internal Server Error"
    });
});