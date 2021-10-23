const sqlite3 = require("sqlite3").verbose();
const testDb = require("better-sqlite3");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("employees.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const employeePackage = grpcObject.employeePackage;
const server = new grpc.Server();

server.bind("0.0.0.0:4040", grpc.ServerCredentials.createInsecure());
server.addService(employeePackage.employeesService.service, {
  createEmployee: createEmployee,
  readEmployees: readEmployees,
  readEmployeesStream: readEmployeesStream,
});
server.start();
console.log("Server started, port listening: 4040");


function createEmployee(call, callback) {
	let data = call.request;
	let mes;

	const db = new testDb("./employees.db",{ verbose: console.log("Creando la conexion")});

	const insert = db.prepare("INSERT INTO Employees(id,name,salary) VALUES (@id,@name,@salary)");

	const inserting = db.transaction(emp=>{
		//emps.forEach(emp=>insert.run(emp));
		insert.run(emp);
		console.log(`Creando el empleado ${emp.name}`);

	})

	inserting(data);

	db.close();

	console.log(db.open ? "Aun no se cierra la conexion" : "Se cerro la conexion");

	callback(null, { mensage: 'Se agregó el empleado correctamente' });
}

function readEmployees(call, callback) {
  callback(null, { employees: arrayEmployees });
}

function readEmployeesStream(call, callback) {
	const db = new testDb("./employees.db",{ verbose: console.log("Creando la conexion")});
	const stmt = db.prepare('SELECT * FROM Employees');
	
	console.log("Haciendo el get de la información")
	const listEmployees = stmt.all();

	db.close();
	
	console.log(db.open ? "Aun no se cierra la conexion" : "Se cerro la conexion");
	
	listEmployees.forEach((emp)=>call.write(emp))

	call.end();
}

