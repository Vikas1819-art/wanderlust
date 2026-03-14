const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");  // ../  means one directory back




const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(res => {
    console.log("connection successfull...");
}).catch(err => {
    console.log(err)
});


async function main() {
    await mongoose.connect(MONGO_URL);
}

let initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner : "69a30949c534278502c944d2"}));
    await Listing.insertMany(initData.data);  
    console.log("data was initialized");

}
initDb();
