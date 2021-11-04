var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var client = require("./genericClient.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res)=>{
	//console.log("req ",req)
	res.send({message:'Mi primer prueba'})

})

app.post('/employees/add', (req,res)=>{
	console.log("POST add employee")
	//console.log("INSERT the employee")
	client.createEmployee(req.body,(err,resServer)=>{
		//err === null ? res.send(resServer) : res.send(err)
		res.send(err === null ? resServer : err);
		//console.log("Error al crear empleado?",err)
		//console.log("Respuesta afirmativa?",resServer)
	});
	//res.send({message: "Reading your request... "})
})

app.get('/employees/list',(req,res)=>{
	console.log("GET employees list")
	let arrayEmployees = []
//	console.log("Starting the employees stream...")
	call = client.readEmployeesStream();
	call.on("data",e=>{
		arrayEmployees.push(e)
		//console.log(`Empleado: ${e.name}`)
	})
	call.on("end",()=>{
		//console.log(arrayEmployees)
		res.send(arrayEmployees)
	})
})

app.delete('/employees/:id',(req,res)=>{
	console.log("DELETE employee")
	//console.log("Request del delete ",req)
	//console.log("Employee ")
	client.deleteEmployee(req.params,(err, resServer)=>{
		//console.log(err === null ? resServer : err)
		res.send(err === null ? resServer : err);
		//console.log(err)
		//console.log(resServer)
	})
	//res.send({"message":"Mira na mas"})
})

app.listen(3002,()=>{
	console.log("Listening on port 3002")
})

