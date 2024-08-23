import express from "express";
const router=express.Router();
import User from "../Model/User.js";
import userjwt from "../middleware/user_jwt.js";
import authorise from "../middleware/authorise.js";

router.get('/', userjwt,authorise("admin"), async(req, res, next) => {
  
    try {
    
        const user = await User.find({}, '-pass');
            res.status(200).json({
                success: true,
                user: user
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
export default router;