import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(
      'MongoDB connected to database:',
      mongoose.connection.db.databaseName
    );
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

export default connectToDatabase;
