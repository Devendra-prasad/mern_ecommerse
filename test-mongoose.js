import mongoose from 'mongoose';
import Listing from './api/models/listing.model.js';

const url = 'mongodb+srv://at941082_db_user:A3A6UvrTHdbG2UOm@real-estate-cluster.trbkeom.mongodb.net/mern-estate?appName=real-estate-cluster';

mongoose.connect(url).then(async () => {
    const filter = {
      name: { $regex: '', $options: 'i' }
    };
    try {
        const totalListings = await Listing.countDocuments(filter);
        const listings = await Listing.find(filter)
          .sort({ createdAt: 'desc' })
          .limit(9)
          .skip(0);
        console.log("Mongoose Listings returned: ", listings.length);
        console.log("Mongoose totalListings: ", totalListings);
    } catch(err) {
        console.log("ERROR OCCURRED: ", err);
    }
    process.exit(0);
}).catch(console.error);
