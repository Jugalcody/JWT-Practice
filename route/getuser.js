const express=require("express");
const router=express.Router();
const User=require("../Model/User");
const userjwt = require("../middleware/user_jwt");
router.get('/', userjwt, async(req, res, next) => {
    try {
    
        const user = await User.findOne({phone:req.user.phone});
            res.status(200).json({
                success: true,
                user: req.user.user
            });
    } catch(error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        })
        next();
    }
});
module.exports = router;