const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('MongoDB URI:', process.env.MONGODB_URI);
        
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log('Database Name:', conn.connection.name);
        
        // Log when the connection is ready
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });

        // Log any errors after initial connection
        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        // Log when the connection is disconnected
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected from MongoDB');
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB; 