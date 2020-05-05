const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    result:{
        type:String,
        enum:["Pass","Fail", "Didn't Attempt", "On hold"],
        required: true
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    interview:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Interview',
        required: true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Result', resultSchema);