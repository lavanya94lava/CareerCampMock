// this file contains all the methods required for results, like adding, updating them
const Interview =  require("../models/Interview");
const Student = require("../models/Student");
const Result = require("../models/Result");

//this function lets you update student details during placement, like pass, fail etc.

module.exports.updateStudentResult = async function(req,res){
    try{

        console.log("selectpicker is -->",req.body.selectpicker);
        console.log(Result.schema.path('result').enumValues);
        if(!Result.schema.path('result').enumValues.includes(req.body.selectpicker)){
            console.log("please heck enum values");
            throw new Error('Result Status Value is not Valid.');
        }

        let student = await Student.findById(req.body.studentId);

        console.log("student is -->",student);
        if(!student){
            console.log("no student found");
            throw new Error('Student not found.');
        }

        await Result.findOne({
            student:req.body.studentId
        },function(err, result){
            console.log("result is --->",result);
            if(err){
                console.log("error in finding the student");
                return;
            }
            if(!result){
                let result = Result.create({
                    result: req.body.selectpicker,
                    interview: req.body.interviewId,
                    student: req.body.studentId
                });
                if(!result){
                    console.log("error in creating result");
                    return;
                }

                console.log("result created is ",result);
                return res.json({success:true,result:result});

            }
            else{
                result.result = req.body.selectpicker;
                console.log("updated result is -->", result);
                result.save();
                return res.json({success:true, result:result});
            }

        });
        
        
    }
    catch(e){
        req.flash("error","cannot update student, please check methods again");
        console.log("error in add student result");
        res.redirect("back");
    }
}