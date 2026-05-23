import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://at941082_db_user:A3A6UvrTHdbG2UOm@real-estate-cluster.trbkeom.mongodb.net/mern-estate?appName=real-estate-cluster";

const listingSchema = new mongoose.Schema({
  name: String,
  status: String,
}, { strict: false });

const Listing = mongoose.model("Listing", listingSchema);

async function check() {
  await mongoose.connect(MONGO_URL);
  const listings = await Listing.find({}).limit(5);
  console.log(listings.map(l => ({ id: l._id, name: l.name, status: l.status })));
  process.exit(0);
}

check();
