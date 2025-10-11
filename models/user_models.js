const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },issuedbook:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Book",
        required :false
    },issueddate:{
        type : String,
        required: false
    },returndate:{
        type: String,
        required : false
    },subscriptiontype:{
        type: String,
        required: true
    },subscriptiondate:{
        type: String,
        required: true
    }

    
},
{
    Timestamp : true
})


module.exports = mongoose.model("User", userSchema)