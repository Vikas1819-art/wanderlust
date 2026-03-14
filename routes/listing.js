const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema ,reviewSchema} = require("../schema.js");
const {isLoggedIn , isOwner} = require("../middleware.js");
const {validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });






router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,validateListing,upload.single("listing[image]") ,wrapAsync(listingController.createListing));


//new route

router.get("/new" ,isLoggedIn, listingController.renderNewForm);


router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner ,upload.single("listing[image]"),validateListing, wrapAsync( listingController.updateListings))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListings));




//index route
router

//show route

router

//create route

router

//edit route

router.get("/:id/edit" ,isLoggedIn ,isOwner,wrapAsync(listingController.renderEditForm));

//update route

router
//delete route

router

module.exports = router ;