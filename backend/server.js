import express from 'express';
import dotenv from 'dotenv'; // Import dotenv
import authRoutes from './routes/auth.routes.js'; // Import the authRoutes
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';

dotenv.config(); // Configure dotenv

const app = express(); // Create an express app
const PORT = process.env.PORT || 5000; // Set the port to 8000

app.use(express.json()); // Use express.json() to parse the body of the request
app.use(express.urlencoded({extended: true})); // to parse form data(req.body)

app.use(cookieParser()); // Use cookieParser to parse the cookies
app.use("/api/auth",authRoutes); // Use the authRoutes

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
}); // Start the server on port 8000