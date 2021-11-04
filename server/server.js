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
  deleteEmployee: deleteEmployee
});
server.start();
console.log("Server started, port listening: 4040");


function createEmployee(call, callback) {
	console.log("---------------------------")
	console.log("Crear empleado")
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
	console.log("---------------------------")
}

function readEmployees(call, callback) {
  callback(null, { employees: arrayEmployees });
}

function readEmployeesStream(call, callback){ 
	console.log("---------------------------")
	console.log("Lista de empleado")
	const db = new testDb("./employees.db",{ verbose: console.log("Creando la conexion")});
	const stmt = db.prepare('SELECT * FROM Employees');
	
	console.log("Haciendo el get de la información")
	const listEmployees = stmt.all();

	db.close();
	
	console.log(db.open ? "Aun no se cierra la conexion" : "Se cerro la conexion");
	
	listEmployees.forEach((emp)=>call.write(emp))

	call.end();
	console.log("---------------------------")
}

function deleteEmployee(call, callback){
	console.log("---------------------------")
	console.log("Eliminar empleado")
	//console.log(call);
	const idEmployee = call.request.id;

	const db = new testDb("./employees.db",{ verbose: console.log("Creando la conexion")});
	const stmt = db.prepare(`DELETE FROM Employees WHERE id =?`);

	const info = stmt.run(idEmployee);

	console.log("Resultado del query ",info)

	db.close();

	console.log(db.open ? "Aun no se cierra la conexion" : "Se cerro la conexion");

	const msg = info.changes !== 0 ? `Se elimino el empleado con el id ${idEmployee}` 
		:  `No se elimino ningun registro, favor de revisar.`

	console.log({mensage: msg})
	callback(null, { mensage: msg });
	console.log("---------------------------")
	/*info.changes !== 0 
		? callback(null, { message: `Se elimino el empleado con el id ${idEmployee}`   })
		: callback(null, { message: `No se elimino ningun registro, favor de revisar.`  });*/
}
