const { mongoose } = require("mongoose");
const noteSchema = mongoose.Schema({
    title:{
        type : String,
        require : true
    },
    body:{
        type : String,
        require : true
    },
    userID:{
        type : String,
        require : true
    },
    username:{
        type : String,
        require : true
    },
    
},{
    versionKey: false
})

const noteModel= mongoose.model("note", noteSchema)

module.exports={
    noteModel
}