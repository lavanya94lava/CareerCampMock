// this file contains all the methods required for results, like adding, updating them
const Interview =  require("../models/Interview");
const Student = require("../models/Student");
const Result = require("../models/Result");

//this function lets you update student details during placement, like pass, fail etc.

module.exports.updateStudentResult = async function(req,res){
    try{

        if(!Result.schema.path('status').enumValues.includes(req.body.selectpicker)){
            throw new Error('Result Status Value is not Valid.');
        }

        let student = await Student.findById(req.params.studentId);

        if(!student){
            throw new Error('Student not found.');
        }
        
        return res.json({success:true, newResult:newResult});
    }
    catch(e){
        req.flash("error","cannot update student, please check methods again");
        console.log("error in add student result");
        res.redirect("back");
    }
}