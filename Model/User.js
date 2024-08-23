import mongoose from "mongoose";
const userSchema=new mongoose.Schema(

    {
        phone:{
            type:String,
            required:true

        },
        pass:{
            type:String,
            required:true
        },
        role:{

            type:String,
            required:true
        }
    }
)

export default mongoose.model("User",userSchema)