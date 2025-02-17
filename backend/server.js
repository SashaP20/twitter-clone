import express from 'express';
import dotenv from 'dotenv'; // Import dotenv

import authRoutes from './routes/auth.route.js'; // Import the authRoutes
import userRoutes from './routes/user.route.js'; // Import the userRoutes
import postRoutes from './routes/post.route.js'; // Import the postRoutes
import notificationRoutes from './routes/notification.route.js'; // Import the notificationRoutes

import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from "cloudinary";

dotenv.config(); // Configure dotenv
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const app = express(); // Create an express app
const PORT = process.env.PORT || 5000; // Set the port to 8000

app.use(express.json({limit: "5mb"})); // Use express.json() to parse the body of the request
app.use(express.urlencoded({extended: true})); // to parse form data(req.body)

app.use(cookieParser()); // Use cookieParser to parse the cookies

app.use("/api/auth",authRoutes); // Use the authRoutes
app.use("/api/user",userRoutes); // Use the userRoutes
app.use("/api/posts",postRoutes); // Use the userRoutes
app.use("/api/notifications",notificationRoutes); // Use the notificationRoutes


app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
}); // Start the server on port 8000