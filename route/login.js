
import express from 'express';
express().use(express.json());
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();  
import User from "../Model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtKey =process.env.JWT_KEY;

router.post("/", async (req, res, next) => {
    const { phone, pass } = req.body;
    try {

        let user_exist = await User.findOne({ phone: phone });
        if (user_exist) {
            const isMatch = await bcrypt.compare(pass, user_exist.pass);

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    msg: 'Invalid phone/password'
                });
            }
            else {


                const payload = {
                    user: {
                        id: user_exist.id,
                        phone: user_exist.phone,
                        role: user_exist.role
                    }
                }

                jwt.sign(payload,jwtKey, { expiresIn: "1h" }, (err, token) => {
                    if (err) {
                        console.error("JWT signing error:", err);
                        return res.status(200).json({
                            success: false,
                            msg: "Something went wrong, please try again later"
                        });
                    }
                    res.json({
                        success: true,
                        msg: "User login",
                        token: token,
                        id: user_exist.id
                    });
                });


            }
        }
        else {
            res.status(400).json({
                success: false,
                msg: "user doesn't exist"
            });
        }


    }
    catch (err) {
        res.json({
            success: false,
            msg: "server error"
        });
    }
});
export default router;

