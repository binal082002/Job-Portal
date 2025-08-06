const mongoose  = require('mongoose');
const URI = "mongodb://127.0.0.1:27017/job-portal";

async function connectDB(){
    try{

        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected")

    }catch(error){
        console.log("error connecting mongodb",error)
    }
}

module.exports = connectDB;