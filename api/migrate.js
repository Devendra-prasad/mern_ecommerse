import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Listing from './models/listing.model.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to MongoDB');
  
  Listing.updateMany(
    { isVerified: { $exists: false } },
    { $set: { isVerified: true } }
  ).then(result => {
    console.log(`Updated ${result.modifiedCount} listings to be verified.`);
    mongoose.disconnect();
  }).catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
}).catch(err => {
  console.error(err);
});
