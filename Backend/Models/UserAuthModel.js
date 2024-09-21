const { ServerMonitoringMode } = require("mongodb");
const mongoose  = require("mongoose");
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:
    {
        type:String,
        require:true
    }
})
const user = mongoose.model("User_model",userSchema)
module.exports = user;

