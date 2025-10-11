const mongoose = require('mongoose')


function dbconnection (){
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL,{
        useNewUrlParser : true,
        useUnifiedTopology: true
    })

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection Error"))
    db.once("open",function(){
        console.log("db connected...")
    })

}


module.exports = dbconnection;