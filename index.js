const Schema = require("./employees_pb");
const fs = require('fs');
const employeesList = require("./employeesList.json");

//console.log(employeesList)
console.log("Creating the employees")

const employees = new Schema.Employees();

employeesList.forEach(employee => {
	let aux = new Schema.Employee();
	aux.setId(employee.id);
	aux.setName(employee.name);
	aux.setSalary(employee.salary);

	employees.addEmployees(aux);
})

const binary = employees.serializeBinary();
console.log(`Los Employees ${binary}`)
fs.writeFileSync("employeesbinary",binary)

const employees2 = Schema.Employees.deserializeBinary(binary)

console.log(`Deserializado ${employees2.toString()}`)

console.log("Finish!")
