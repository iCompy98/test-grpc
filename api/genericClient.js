const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("employees.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const employeePackage = grpcObject.employeePackage;


const client = new employeePackage.employeesService("0.0.0.0:4040", grpc.credentials.createInsecure());

module.exports = client;
