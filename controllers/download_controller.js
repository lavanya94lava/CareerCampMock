// this file contains all the methods required for downloading files in csv format, like adding, updating them

const Interview =  require("../models/Interview");
const Student = require("../models/Student");
const Result = require("../models/Result");

const path = require('path');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    header:[
        { id: 'id', title: 'STUDENT_ID' },
        { id: 'name', title: 'STUDENT_NAME' },
        { id: 'batch', title: 'STUDENT_BATCH'},
        { id: 'college', title: 'STUDENT_COLLEGE'},
        { id: 'status', title: 'STUDENT_STATUS'},
        { id: 'DSA', title: 'DSA_SCORE' },
        { id: 'WebD', title: 'WebD_SCORE' },
        { id: 'React', title: 'REACT_SCORE' },
        { id: 'date', title: 'INTERVIEW_DATE' },
        { id: 'company', title: 'INTERVIEW_NAME' },
        { id: 'result', title: 'INTERVIEW_RESULT' }
    ],
    path: path.join(__dirname,'..','/downloadFile','data.csv')
});

module.exports.downloadableFile = async function(req,res){
    try{

        let interviews = await Interview.find({});

        let res = -1;
        for(let i=0;i<interviews.length;i++){
            for(let j=0;j<interviews[i].students.length;j++){
                let student = await Student.findById(interviews[i].students[j]);
                 await Result.findOne({interview:interviews[i]._id,
                     student: interviews[i].students[j]},
                     function(err,result){
                        if(err){
                            console.log("error in finding the student");
                        }
                        if(!result){
                            console.log("No results to show");
                            res = "Did Not Attempt"
                        }
                        else{
                            res = result.result;
                            console.log("Yes there are results to show-->", res);
                        }
                        const records = [{
                            id:student._id, name:student.name, batch:student.batch, college:student.college, status:student.status, DSA: student.course.DSA, WebD:student.course.WebD, React: student.course.React, date:interviews[i].date, company: interviews[i].company, result:res
                        }];
                        console.log("reaching results", records);
                        csvWriter.writeRecords(records).then(()=>console.log("congrats on successfully making the csv"));
                     });
            }
        }

        console.log("path is -->", path.join(__dirname,'..','downloadFile','data.csv'));
         res.download(path.join(__dirname,'..','downloadFile'),'data.csv',function(err,success){
             if(err){
                 req.flash("error","cannot download file");
                 console.log("error is ", err);
             }
         });

    }
    catch(e){
        req.flash("error","error in creating downloadble file");
        console.log("error in creating downloadble file");
        return res.redirect("back");
    }
}