const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("employees.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const employeePackage = grpcObject.employeePackage;
const arrayEmpleados = require("./employeesList.json")

const client = new employeePackage.employeesService("10.0.8.188:4040", grpc.credentials.createInsecure());

arrayEmpleados.forEach(employee =>{
	client.createEmployee(employee,(err,res)=>{
		console.log(res)
	})
})

client.createEmployee({
	"id":99,
	"name":"Juanito Perez",
	"salary":578.59
},(err,response)=>{
	console.log(err);
	console.log(response);
})


