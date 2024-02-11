const mongoose = require ("mongoose")

const songSchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    imageUrl:{
        type : String,
        required : true,
    },
    songUrl:{
        type : String,
        required : true,
    },
    artist:{
        type : String,
        required : true,
    },
     language:{
        type : String,
        required : true,
    },
    album:{
        type : String,
    },
    category :{
        type : String,
        required : true,
    },
    // twitter:{
    //     type : String,
    //     required : true,
    // },
    // instagram:{
    //     type : String,
    //     required : true,
    // },
},

{
    timestamps:true
})

module.exports = mongoose.model("song" ,  songSchema)