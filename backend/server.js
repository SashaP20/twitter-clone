import express from 'express';
import dotenv from 'dotenv'; // Import dotenv
import authRoutes from './routes/auth.routes.js'; // Import the authRoutes
import connectMongoDB from './db/connectMongoDB.js';

dotenv.config(); // Configure dotenv

const app = express(); // Create an express app

app.use("/api/auth",authRoutes); // Use the authRoutes
const PORT = process.env.PORT || 5000; // Set the port to 8000

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
}); // Start the server on port 8000