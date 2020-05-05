//method to submit to send data using ajax


let studentsArray = [];

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
            <td><a href = "/interview/${interview._id}">${interview.company}</a></td>
            <td>${interview.package}</td>
            <td>${interview.date}</td>
            </tr>
             `);
}



let url = window.location.href;
let id = url.substring(url.lastIndexOf('/') + 1);

$("#inputStudent").autocomplete({
    maxResults:5,
    source: function (request, response) {
        console.log(request);
       $.ajax({
          url: `/interviews/${id}`,
          type: "GET",
          data: request.term,
            success: function(data){
                request.term = request.term.toLowerCase();
                let matches =[];
                for(let i = 0;i< data.studentsArray.length;i++){
                    if (~data.studentsArray[i].toLowerCase().indexOf(request.term)) matches.push(data.studentsArray[i]);
                }
                response($.map(matches,function(value){
                    return {
                        label: value,
                        value: value,
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
          this.value = ui.item.label;
          // Set the id to the next input hidden field
          $(this).next("input").val(ui.item.value);
          // Prevent other event from not being execute            
          event.preventDefault();
       }
});
  