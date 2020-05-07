//this file contains all the methods related to interviews like adding a new interview, fetching all interviews etc.

const Interview = require('../models/Interview');
const Result = require('../models/Result');
const Student = require('../models/Student');

module.exports.showAllInterviews = async function(req,res){
    try{
        if(!req.isAuthenticated()){
            req.flash("error", "please sign in before accessing this page");
            return res.redirect("back");
        } 
        let interviews = await Interview.find({});
                    
        return res.render('interview',{title:'Interview',interviews:interviews });
    }
    catch(e){
        req.flash("error","something went wrong in fetching students");
        return res.redirect("back");
    }
}


module.exports.addInterview = async function(req,res){
    try{
        if(!req.body.company||!req.body.date|| !req.body.package){
            req.flash("error", "Please fill all the fields");
            return res.redirect("back");
        }

        let addInterview = await Interview.create({
            company: req.body.company,
            package:req.body.package,
            date: req.body.date,
        });

        let interviews = await Interview.find({});
        
        let interviewsLength = interviews.length;

        req.flash("success", "congrats on adding data using ajax");
        return res.json({success: true, message: "Congrats on adding a new interview", addInterview:addInterview, interviewsLength:interviewsLength});
    }
    catch(e){
        req.flash("error","something went wrong in adding student");
         return res.json({success: false,message:e.message});
    }
}

module.exports.viewInterview = async function(req,res){
    try{
        if(!req.isAuthenticated()){
            req.flash("error", "please sign in before accessing this page");
            return res.redirect("back");
        }
        
        let interview = await Interview.findById(req.params.id);

        let studentsArray = await Student.find({});

        let students = [];

        let studentResult  = {};
        for(let i =0;i<interview.students.length;i++){
            let student = await Student.findById(interview.students[i]);
            students.push(student);
             await Result.findOne({student:student},
                    function(err,result){
                        if(!result){
                            studentResult[student._id] = "Did Not Attempt";  
                        }
                        else{
                            studentResult[student._id] = result;
                        }
                    }
            );
        }
        // console.log("ResultLog-->", studentResult);
        if(req.xhr){

            return res.json({success: true, message: "Congrats on autocompleting new student",studentsArray:studentsArray});
        }

        return res.render('viewInterview',{title: interview.company,interview:interview, students:students,studentResult:studentResult});
    }
    catch(e){
        req.flash("error", "something went wrong in accessing interview using ID");
        return res.json({success: false,message: "Catching the error here in viewInterview " +e.message});
    }
} 


module.exports.addStudentInterview = async function(req,res){
    try{
        if(!req.body.student){
            req.flash("error", "Please fill all the fields");
            return res.redirect("back");
        }

        let student = await Student.findById(req.body.student);

        if(!student){
            req.flash("error", "no such student exist");
            return res.redirect("back");
        }

        let interview =  await Interview.findById(req.params.interviewId);

        if(!interview){
            req.flash("error", "no such interview exist");
            return res.redirect("back");
        }

        interview.students.push(student);
        student.interviews.push(interview);

        await interview.save();
        await student.save();

        let studentsLength = interview.students.length;

        return res.json({success:true, message:"congrats on adding a new student to interview",student:student,studentsLength:studentsLength});
        
    }
    catch(e){
        req.flash("error", "something went wrong in adding student to interview using ID");
        return res.json({success: false,message: "Catching the error here in addStudentInterview" +e.message});
    }
}