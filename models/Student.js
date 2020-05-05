const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    batch:{
        type: String,
        required: true
    },
    college:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Placed','Not Placed'],
        required: true
    },
    course:{
        DSA:{
            type:Number,
            required:true
        },
        WebD:{
            type:Number,
            required:true
        },
        React:{
            type: Number,
            required: true
        }
    },
    interviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Interview'
    }]
},{
    timestamps:true
})


module.exports = mongoose.model('Student', studentSchema);