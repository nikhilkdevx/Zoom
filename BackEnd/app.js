const express = require("express");
const app = express();

const PORT = 9090;

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.1:27017/zoom")
.then(()=>{
    console.log("MONGODB CONNECTED");
})
.catch((err)=>{
    console.log("MONGODB CONNECTION ERROR: ",err);
})

app.listen(PORT,()=>{
    console.log(`APP IS LISTENING TO ${PORT}`);
});

app.get("/",(req,res)=>{
    res.json({message : "Currently on Home Tab"
    });
});

// ERROR HANDLING LOGIC
app.use((err,req,res,next)=>{
    console.log(err);

    res.status(500).json({
        message: "Internal Server Error"
    });
});