var express = require('express');
var app = express();

app.get('/', (req,res){
	res.send({message:'Mi primer prueba'})
})

app.listen(3000,()=>{
	console.log("Listening on port 3000")
})
