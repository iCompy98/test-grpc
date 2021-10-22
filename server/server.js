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
	let db = new sqlite3.Database("./employees.db", (err) => {
		if (err === null) {
			console.log("Se abrio la conexion, con opcion de escribir");
		} else {
			console.log("Algo paso");
		}
	});

	db.run("INSERT INTO Employees(id,name,salary) VALUES(?,?,?)",[data.id, data.name, data.salary],(err)=>{
		if(err){
			console.log(err.message);
			mes = err.message;
		}else{
			mes = 'Se agregó el empleado correctamente';
		}
		db.close((err)=>{console.log("Se cerro correctamente")});
		callback(null, { mensage: mes });
	});	
}

function readEmployees(call, callback) {
  callback(null, { employees: arrayEmployees });
}

function readEmployeesStream(call, callback) {

	const db = new testDb("./employees.db",{verbose: console.log});

	const stmt = db.prepare('SELECT * FROM Employees')
	const listEmployees = stmt.all()
	db.close();

	listEmployees.forEach((emp)=>call.write(emp))

	call.end();
}

