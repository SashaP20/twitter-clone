import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


// check if the user is logged in and has a valid token
export const protectRoute = async (req, res, next) => {
  try{
    const token = req.cookies.jwt; // Get the token from the cookie
    if(!token){
      return res.status(401).json({error: "Unauthorized: No Token Provided"});
    }

    const decoded= jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    console.log(decoded.userId);
    if(!decoded){
      return res.status(401).json({error: "Unauthorized: Invalid Token"});
    }

    const user = await User.findById(decoded.userId).select("-password"); // Select all fields except password
    if(!user){
      return res.status(404).json({error: "User not found"});
    }

    req.user = user; // Set the user in the request object
    next();
    
  } catch(error){
    console.log("Error in protectRoute middleware: ", error.message);
    return res.status(500).json({error: "Internal Server Error"});
  }
};
