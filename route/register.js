const express = require("express");
express().use(express.json());
const router = express.Router();  
const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = "secret";


router.post("/", async (req, res, next) => {
    const { phone, pass,role} = req.body;

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

        const payload = {
            user: {
                id: user.id,
                phone:user.phone,
                pass:user.pass,
                role:user.role
            }
        }
           
        jwt.sign(payload, jwtKey, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                console.error("JWT signing error:", err);
                return res.status(500).json({
                    success: false,
                    msg: "Something went wrong, please try again later"
                });
            }
            res.json({
                success: true,
                msg: "User registered",
                token: token,
                id:user.id,
                role:user.role
            });
        });

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({
            success: false,
            msg: "Server error"
        });
    }
});




module.exports = router;
