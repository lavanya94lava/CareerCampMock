const express = require('express');
const router = express.Router();

console.log("reaching routes");

router.get('/',(req,res)=>{
   return res.render('home',{title:'Carrer Camp'});
});

module.exports = router;