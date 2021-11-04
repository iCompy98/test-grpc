# Test gRPC

This proyect is a gRPC example. This one have the server side, and the client side.

## Protoc

This directory contains the compiler to the .proto file

## Dockerfile

In this proyect, you have two Dockerfiles, ones to server and another to the API.

To create any image, you need to be in the path of the Dockerfile, whatever you want.

Like:
` cd path/to/Dockerfile `

Now, you need to build the images. Preferably, the server should be called "grpc-server" and the API "grpc-api"  

` docker build -t grpc-XXX . `

Finally. you need run the proyects. We need the port 4040 for grpc server, and the port 3002 to api server

` docker run -p XXXX:XXXX grpc-XXXX `

NOTE: These images have statics ports so, if you want to change the ports, you must change the files
    
    
    
    
    
    
    
    
    
    
    
    
    

