const mongoose=require('mongoose')
const userSchema=new mongoose.Schema(

    {
        phone:{
            type:String,
            required:true

        },
        pass:{
            type:String,
            required:true
        }
    }
)

module.exports=mongoose.model("User",userSchema)