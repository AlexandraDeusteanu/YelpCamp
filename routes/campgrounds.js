const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError");
const Campground = require("../models/campground");
const campgrounds = require("../controllers/campgrounds");
const {isLoggedIn, validateCampground, isAuthor} = require ("../middleware");
const multer  = require('multer');
const {storage} = require("../cloundinary");
const upload = multer({storage});

router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground));
    // .post(upload.array("image"), (req, res) => {
    //     res.send(req.body)
    //     console.log(req.files)
    // })

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
.get(catchAsync(campgrounds.showCampground))
.put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.updateCampground))

.delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))



router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));



module.exports = router;