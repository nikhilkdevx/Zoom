const ExpressError = require("../utilis/ExpressError");
const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");
const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new ExpressError(StatusCodes.UNAUTHORIZED,"Authentication Required");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_SECERT);
    if(decoded.error){
        throw new ExpressError(StatusCodes.FORBIDDEN,decoded.error.message)
    }
    req.user = decoded;
    next();
};

module.exports = authMiddleware;

