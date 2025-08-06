const mongoose = require("mongoose");

const job_schema = new mongoose.Schema({
    title : {
        type : String,
        require : true,
    },

    description : {
        type : String,
        require : true,
    },

    company : {
        type : String,
        require : true,
    },

    location : {
        type : String,
        require : true,
    },

});


const Job = new mongoose.model("Job", job_schema)

module.exports = Job;