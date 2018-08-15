const Rave = require("../models/rave"),
    Comment = require("../models/comment");

// all the middleare goes here
let middlewareObj = {};

middlewareObj.checkRaveOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Rave.findById(req.params.id, (err, foundRave) => {
            if (err || !foundRave) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                // does user own the rave?
                if (foundRave.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You don't have permission to do that, please login first");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err || !foundComment) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                // does user own the comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You don't have permission to do that, please login first");
    res.redirect("/login");
};

module.exports = middlewareObj;
