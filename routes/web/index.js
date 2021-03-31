var express =require("express");

var router =express.Router();

//Utilisez la classe express.Router 
//pour créer des gestionnaires de route modulaires et pouvant être montés.

// TODO :: add in err and info

router.use(function(req,res,next){
        res.locals.currentUser=req.user;
        res.locals.error = req.flash("error");
        res.locals.info = req.flash("info");
        next();
});

router.use("/",require("./home"));
router.use("/posts",require("./post"));

module.exports=router;