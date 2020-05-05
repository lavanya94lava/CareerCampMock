//method to submit to send data using ajax

$('#add-student-form').submit(function(e){
    e.preventDefault();

    $.ajax({
        method:'POST',
        url:'/students/addStudent',
        data: $('#add-student-form').serialize(),
        success: function(data){
            let newStudent = newStudentDom(data.addStudent, data.studentsLength);
            $('.table').append(newStudent);
        },
        error: function(error){
            console.log(error.responseText);
        }
    });
});


let newStudentDom = function(student, studentsLength){
    return $(`
            <tr>
            <th scope="row">${studentsLength}</th>
            <td>${student.name}</td>
            <td>${student.batch}</td>
            <td>${student.college}</td>
            <td> ${student.course.DSA} </td>
            <td> ${student.course.WebD}  </td>
            <td> ${student.course.React} </td>
            <td>${student.status}</td>
            </tr>
             `);
}