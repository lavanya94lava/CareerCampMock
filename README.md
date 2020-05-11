# Career Camp Interface Mock

In this project we are making an interface for a company's employees to view the reports of students who are part of placement batch of an EdTech Company, In this an employee can add students to batch, schedule interviews and update a student's reports. Reports include, a student's marks in various courses, whether he is placed or not and what is his status regarding every company.


# Software Requirements

1. Node.js 8 or above
2. MongoDB 4.2

# Dependencies Used

1. express
2. express-session
3. EJS
4. EJS-layouts
5. bootstrap
6. Noty.js
7. JQuery
8. Mongo-Store
9. Passport-local
10. bcrypt
11. flash
12. cookie-parser

# Project structure


    ├── index.js
    ├── package.json
    ├── assets
    |    ├── css
    |        ├── footer.css
             ├── header.css
             ├── layout.css
         ├──js
             ├──add_interview.js
             ├──add_student.js
    ├── config
        ├── mongoose.js
        ├── middleware.js   
        ├── passport-local-strategy.js    
    ├── controllers
            ├── home_controller.js  
            ├── interview_controller.js
            ├── result_controller.js  
            ├── students_controller.js  
            ├── users_controller.js            
    ├── downloadFile
    │   ├── data.csv
    ├── models
    │   ├── Interview.js
    │   ├── Result.js
    │   ├── Student.js
    │   ├── Employee.js
    ├── views
    │   ├── _footer.ejs
        ├── _header.ejs
        ├── interview.ejs
        ├── home.ejs
        ├── layout.ejs
        ├── viewInterview.ejs
        ├── students.ejs
        ├── sign_in.ejs
        ├── sign_up.ejs
    ├── routes
            ├── index.js  
            ├── interviews.js
            ├── results.js
            ├── students.js
            ├── users.js
            ├── download.js
    ├── .gitignore

# setup

>         https://github.com/lavanya94lava/CareerCampMock.git
>         cd CareerCampMock
>         run nodemon index.js

# How Application Works

1. Employee sign-in or sign-up.
2. In header you will get to choose between students list, interviews list and download option.
3. If Employee go into students list, they can add new students.
4. If Employee go into interview list, they can add new companies and assign new students to each company.
5. Employee can update the result of a student as the process progresses.
6. Employee can download all the data that is present there using download button given in the headers


# Features

1. All the passwords are encrypted in mongoDb.
2. Adding new students and interview is being done using AJAX calls and the page doesn't refresh.
3. Notifiactions are displayed on the page whenever something new happens using Flash message and Noty
