const express = require("express"),
    router = express.Router({mergeParams: true}),
    Rave = require("../models/rave"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, (req, res) => {
    // find rave by id
    console.log(req.params.id);
    Rave.findById(req.params.id, (err, rave) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {rave: rave});
        }
    })
});

//Comments Create
router.post("/", middleware.isLoggedIn, (req, res) => {
    //lookup rave using ID
    Rave.findById(req.params.id, (err, rave) => {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/raves");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    rave.comments.push(comment);
                    rave.save();
                    console.log(comment);
                    req.flash("success", "You have Successfully created your Comment");
                    res.redirect('/raves/' + rave._id);
                }
            });
        }
    });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Rave.findById(req.params.id, (err, foundRave) => {
        if (err || !foundRave) {
            req.flash("error", err.message);
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                res.render("comments/edit", {rave_id: req.params.id, comment: foundComment});
            }
        });
    });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success", "You have Successfully edited your Rave Comment");
            res.redirect("/raves/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success", "You have Successfully deleted your Rave Comment");
            res.redirect("/raves/" + req.params.id);
        }
    });
});

module.exports = router;
