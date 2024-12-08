import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/next-auth';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI, {});
    isConnected = true;
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};
