const mongoose = require("mongoose");

const application_schema = new mongoose.Schema({
    job : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Job'
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }

});


const Application = new mongoose.model("Application", application_schema)

module.exports = Application;