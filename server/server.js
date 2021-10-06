const grpc = require('grpc');

const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync("employees.proto",{});

const grpcObject = grpc.loadPackageDefinition(packageDef);

const employeePackage = grpcObject.employeePackage;
const arrayEmployees = []
const server = new grpc.Server();
server.bind("0.0.0.0:4040", grpc.ServerCredentials.createInsecure());
server.addService(employeePackage.employeesService.service,{
	"createEmployee": createEmployee,
	"readEmployees": readEmployees,
	"readEmployeesStream": readEmployeesStream
});
server.start()

function createEmployee (call, callback) {
	console.log(call.request);
	arrayEmployees.push(call.request);
	let mes = "Se agrego el empleado, correctamente";
	callback(null,{ mensage: mes});
}

function readEmployees (call, callback) {
	callback(null,{"employees":arrayEmployees})
}

function readEmployeesStream(call,callback){
	arrayEmployees.forEach(emp => call.write(emp))
	call.end();
}
