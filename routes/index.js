const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
   return res.render('home',{title:'Carrer Camp'});
});

//various routes for user
router.use('/users',require("./users"));

router.use('/students',require("./students"));

module.exports = router;