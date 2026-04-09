import mongoose from 'mongoose';

const url = 'mongodb+srv://at941082_db_user:A3A6UvrTHdbG2UOm@real-estate-cluster.trbkeom.mongodb.net/mern-estate?appName=real-estate-cluster';

mongoose.connect(url).then(async () => {
    const db = mongoose.connection.db;
    const listings = await db.collection('listings').find({}).toArray();
    console.log("TOTAL LISTINGS: " + listings.length);
    if(listings.length > 0) {
        console.log("SAMPLE LISTING KEYS:", Object.keys(listings[0]));
        console.log("SAMPLE LISTING VALUES:", {
            name: listings[0].name,
            offer: listings[0].offer,
            furnished: listings[0].furnished,
            parking: listings[0].parking,
            type: listings[0].type
        });
    }

    const filter = {
      name: { $regex: '', $options: 'i' }
    };
    const c1 = await db.collection('listings').find(filter).toArray();
    console.log("COUNT WITH EMPTY REGEX:", c1.length);
    
    process.exit(0);
}).catch(console.error);
