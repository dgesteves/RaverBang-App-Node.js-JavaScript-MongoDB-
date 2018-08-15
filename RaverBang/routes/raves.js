const express = require("express"),
    router = express.Router(),
    Rave = require("../models/rave"),
    middleware = require("../middleware");


//INDEX - show all raves
router.get("/", (req, res) => {
    // Get all raves from DB
    Rave.find({}, (err, allRaves) => {
        if (err) {
            console.log(err);
        } else {
            res.render("raves/index", {raves: allRaves});
        }
    });
});

//CREATE - add new rave to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
    // get data from form and add to raves array
    const name = req.body.name,
        price = req.body.price,
        image = req.body.image,
        desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newRave = {name: name, price: price, image: image, description: desc, author: author};
    // Create a new rave and save to DB
    Rave.create(newRave, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            //redirect back to raves page
            console.log(newlyCreated);
            req.flash("success", "You have Successfully added a new Rave");
            res.redirect("/raves");
        }
    });
});

//NEW - show form to create new rave
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("raves/new");
});

// SHOW - shows more info about one rave
router.get("/:id", (req, res) => {
    //find the rave with provided ID
    Rave.findById(req.params.id).populate("comments").exec((err, foundRave) => {
        if (err || !foundRave) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            console.log(foundRave);
            //render show template with that rave
            res.render("raves/show", {rave: foundRave});
        }
    });
});

// EDIT RAVE ROUTE
router.get("/:id/edit", middleware.checkRaveOwnership, (req, res) => {
    Rave.findById(req.params.id, (err, foundRave) => {
        res.render("raves/edit", {rave: foundRave});
    });
});

// UPDATE RAVE ROUTE
router.put("/:id", middleware.checkRaveOwnership, (req, res) => {
    // find and update the correct rave
    Rave.findByIdAndUpdate(req.params.id, req.body.rave, (err, updatedRave) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/raves");
        } else {
            //redirect somewhere(show page)
            req.flash("success", "You have Successfully edited your Rave");
            res.redirect("/raves/" + req.params.id);
        }
    });
});

// DESTROY RAVE ROUTE
router.delete("/:id", middleware.checkRaveOwnership, (req, res) => {
    Rave.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/raves");
        } else {
            req.flash("success", "You have Successfully deleted your Rave");
            res.redirect("/raves");
        }
    });
});


module.exports = router;

