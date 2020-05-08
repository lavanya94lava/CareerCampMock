//this file contains javascript methods for various interview methods mostly using AJAX 

let studentsArray = [];

//add a new inteview details as a hyperlink so that it could open in a new page with details .
$('#add-interview-form').submit(function(e){
    e.preventDefault();

    $.ajax({
        method:'POST',
        url:'/interviews/addInterview',
        data: $('#add-interview-form').serialize(),
        success: function(data){
            let newInterview = newInterviewDom(data.addInterview, data.interviewsLength);
            $('.table').append(newInterview);
        },
        error: function(error){
            console.log(error.responseText);
        }
    });
});


let newInterviewDom = function(interview, interviewsLength){
    return $(`
            <tr>
            <th scope="row">${interviewsLength}</th>
            <td><a href = "/interviews/${interview._id}">${interview.company}</a></td>
            <td>${interview.package}</td>
            <td>${interview.date}</td>
            </tr>
             `);
}



let url = window.location.href;
let id = url.substring(url.lastIndexOf('/') + 1);


// this function is used for autocomplete on the same page
$("#inputStudent").autocomplete({
    source: function (request, response) {
       $.ajax({
          url: `/interviews/${id}`,
          type: "GET",
          data: request.term,
            success: function(data){
                request.term = request.term.toLowerCase();
                let matches =[];
                for(let i = 0;i< data.studentsArray.length;i++){
                    if (~data.studentsArray[i].name.toLowerCase().indexOf(request.term)) matches.push(data.studentsArray[i]);
                }
                response($.map(matches,function(value){
                    return {
                        label: value.name,
                        batch:value.batch,
                        value: value._id,
                    };
                }));
            }
          });
       },
       
       // The minimum number of characters a user must type before a search is performed.
       minLength: 2,
       
       // set an onFocus event to show the result on input field when result is focused
       focus: function (event, ui) {
          this.value = ui.item.label;
          // Prevent other event from not being execute
          event.preventDefault();
       },
       select: function (event, ui) {
          // Prevent value from being put in the input:
          this.value = ui.item.value;   
          event.preventDefault();
       }
});

// add a new student to the list of a particular company, for that we send interview id in params
$('#add-student-interview').submit(function(e){
    e.preventDefault();

    $.ajax({
        method:'POST',
        url:`/interviews/${id}/addStudentInterview`,
        data: $('#add-student-interview').serialize(),
        success: function(data){
            let newStudentInterview = newStudentInterviewDom(data.student, data.studentsLength);
            $('.table').append(newStudentInterview);
        },
        error: function(error){
            console.log(error.responseText);
        }
    });
});


let newStudentInterviewDom = function(student, studentsLength){
    return $(`
            <tr>
            <form id = "update-student-form" action="/results/${id}/${student._id}" method = "POST"> 
                <th scope="row">${studentsLength}</th>
                <td>${student.name}</td>
                <td>${student.batch}</td>
                <td>${student.college}</td>
                <td>
                <input class = "studentId" type="hidden" name = "studentId" value = ${student._id}>
                <input class = "interviewId" type="hidden" name = "interviewId" value = ${id}>
                <select class="selectpicker" data-style="btn-info" name="selectpicker">        
                    <option value="Did Not Attempt">Did Not Attempt</option>
                    <option value="Pass">Pass</option>
                    <option value="Fail">Fail</option>
                    <option value="On Hold">On Hold</option>
                </select>
                </td>
                <td>
                        <button type = "submit" class="btn btn-primary btn-block">Update</button>
                </td>
                </form>
            </tr>
             `);
    }
    
//this method is used for updating the student value after you change the value in dropdown 
    $('#update-student-form').submit(function(e){
    e.preventDefault();
    let studentId = $("#update-student-form .studentId").val();
    $.ajax({
        method:"post",
        url:`/results/${id}/${studentId}`,
        data:$('#update-student-form').serialize(),
        success:function(data){
            $("#button-btn").text("updating "+data.success);
            setTimeout(()=>{
                $("#button-btn").text("updated");
            },1000);
        },
        error: function(error){
            console.log(error.responseText);
        }
    });
});

