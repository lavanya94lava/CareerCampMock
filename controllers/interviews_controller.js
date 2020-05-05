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
        if(!req.body.company||!req.body.date){
            req.flash("error", "Please fill all the fields");
            return res.redirect("back");
        }

        let addInterview = await Interview.create({
            company: req.body.company,
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