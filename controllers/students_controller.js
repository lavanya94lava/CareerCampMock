// /this file contains all the students controllers, which perfoms functions like get all students or add new student etc.

module.exports.showAllStudents = async function(req,res){
    try{
        return res.render('students',{title:'Student'});
    }
    catch(e){
        req.flash("error","something went wrong in fetching students");
    }
}