const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    result:{
        type:String,
        enum:['Pass','Fail', 'Not Attempted', 'On hold'],
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
});

module.exports = mongoose.model('Result', resultSchema);