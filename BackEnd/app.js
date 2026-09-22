const express = require("express");
const app = express();

const PORT = 9090;

app.listen(PORT,()=>{
    console.log(`APP IS LISTENING TO ${PORT}`);
});