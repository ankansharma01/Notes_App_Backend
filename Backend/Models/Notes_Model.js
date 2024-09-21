const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    userId:{
        type:String
    }
},{timestamps:true})

const Notes = mongoose.model('Notes_Model',noteSchema);

module.exports={Notes};