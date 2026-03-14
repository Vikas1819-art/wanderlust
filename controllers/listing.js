const Listing = require("../models/listing");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN ;
const geocodingClient = mbxgeocoding({ accessToken: mapToken });



module.exports.index =  async (req ,res) => {
  let allListings = await Listing.find({});
  res.render("./listings/index.ejs" , {allListings});
}


module.exports.renderNewForm = (req,res) => {
   
    res.render("./listings/new.ejs")
}

module.exports.showListing = async(req ,res) => {
    const {id} = req.params ;
    const listings = await Listing.findById(id).populate({path : "reviews", populate:{ path :"author"}}).populate("owner");
    if(!listings){
           req.flash("error" , "Listing does not exist!");
        return   res.redirect("/listings"); 
    }
    res.render("./listings/show.ejs" , {listings})

}

module.exports.createListing = async(req ,res,err) => {
   
  let response = await  geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send();  

  let url = req.file.path;
  let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id ;
    newListing.image = {url,filename}; 
    newListing.geometry = response.body.features[0].geometry ;
  let savedListing =  await newListing.save();

  console.log(savedListing);

   req.flash("success" , "New listings Created");
    res.redirect("/listings");

   
}


module.exports.renderEditForm = async(req,res) => {
    const {id} = req.params ;
     const listing = await Listing.findById(id);
      if(!listing){
           req.flash("error" , "Listing does not exist!");
        return   res.redirect("/listings"); 
    }

    let originalImageUrl = listing.image.url;
   originalImageUrl = originalImageUrl.replace("/upload" , "/upload/h_300,w_250");
     res.render("./listings/edit.ejs" , {listing , originalImageUrl})

}

module.exports.updateListings = async(req,res) => {

    let {id} = req.params 
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing})  // three dots are spread operator 
    // Take all the properties inside req.body.listing and spread them into this new object.”

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename}; 
       await listing.save();
    }

       req.flash("success" , " Listings Updated!");

    res.redirect(`/listings/${id}`);
}

module.exports.deleteListings = async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
       req.flash("success" , " Listings Deleted");
    res.redirect("/listings");

}