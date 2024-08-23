
import express from 'express';
express().use(express.json());
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();  
import User from "../Model/User.js";
import bcrypt from "bcrypt";



router.post("/", async (req, res, next) => {
    const { phone,pass,role} = req.body;
      
    try {
        let user_exist = await User.findOne({ phone: phone });
        if (user_exist) {
            return res.status(400).json({
                success: false,
                msg: "User already exists"
            });
        }
        
        let user = new User();
        user.phone = phone;
        user.role=role;
        const hash = await bcrypt.hash(pass, 10);
        user.pass = hash;

        await user.save();    

        res.json({
           success: true,
            msg: user.role +" registered",
            id:user.id,
            role:user.role
        });
        

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({
            success: false,
            msg: "Server error"
        });
    }
});




export default router;
