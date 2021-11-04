const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("employees.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const employeePackage = grpcObject.employeePackage;


const client = new employeePackage.employeesService("10.0.8.188:4040", grpc.credentials.createInsecure());

module.exports = client;
