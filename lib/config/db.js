const mongoose = require('mongoose');
const UserProfile = require('../models/UserProfile');

require('dotenv').config();

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    }catch(error){
        console.log('Error connecting to MongoDB: ', error);
        process.exit(1); //Exit process with failure
    }
};

const cleanUpDatabase = async() => {
    await connectDB ();

    try {
        const result = await UserProfile.deleteMany({ user: null });
        console.log(`Deleted ${result.deletedCount} documents with null user field`);
      } catch (error) {
        console.error('Error cleaning up the database:', error);
      } finally {
        mongoose.connection.close();
      }  
};

cleanUpDatabase();



module.exports = connectDB;