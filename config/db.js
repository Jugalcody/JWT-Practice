import mongoose from "mongoose";
mongoose.set('strictQuery', false);
const connectDB = async() => {
    try{
    const conn=await mongoose.connect(`mongodb+srv://jugalnerist:Jugal2002@cluster0.fjhosdo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log(`MongoDB Connected:${mongoose.connection.host}`);
    }
    catch(err){
        console.log(err);
    }

}

export default connectDB;