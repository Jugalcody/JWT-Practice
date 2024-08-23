import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const jwtKey =process.env.JWT_KEY;
export default async function (req, res, next) {
    const token = req.header("Authorization");
    console.log('Extracted Token:', token);
    if (!token) {
        return res.status(401).json({
            msg: "no token , authorization denied"
        });
    }

    try {
        await jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    msg: err
                });
            }
            else {
                req.user = decoded;
                console.log(req.user);
                next();
            }
        });
    }
    catch (err) {
        console.log("something went wrong with middleware " + err);

        res.status(500).json({
            msg: "Server error"
        });

    }
}
