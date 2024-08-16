const express=require("express");
const bcrypt=require("bcrypt");
const router=express.Router();
const jwt = require("jsonwebtoken");
const User=require("../Model/User");
router.post("/",async(req,res,next)=>{
  const{phone,pass}=req.body;
      try{

      let user_exist=await User.findOne({phone:phone});
      if(user_exist){
          const isMatch = await bcrypt.compare(pass, user_exist.pass);

      if(!isMatch) {
          return res.status(400).json({
              success: false,
              msg: 'Invalid password'
          });
      }
      else{

         
        const payload = {
          user: {
              id: user_exist.id,
              phone:user_exist.phone,
              pass:user_exist.pass
          }
      }
      
      jwt.sign(payload,"secret", { expiresIn: "1h" }, (err, token) => {
        if (err) {
            console.error("JWT signing error:", err);
            return res.status(200).json({
                success: false,
                msg: "Something went wrong, please try again later"
            });
        }
        res.json({
            success: true,
            msg: "User registered",
            token: token,
            id:user_exist.id
        });
    });


      }
      }
      else{
          res.json({
         success:false,
         msg:"user doesn't exist"
          });
      }
      

      }
      catch(err){
        res.json({
          success:false,
          msg:"server error"
           });
      }
});
module.exports=router;

