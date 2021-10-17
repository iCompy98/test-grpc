# Test gRPC

This proyect is a gRPC example. This one have the server side, and the client side.

## Protoc

This directory contains the compiler to the .proto file

## Dockerfile

To run the server on docker, you will need run the Dockerfile.

First, you will go to the directory where you have the Dockerfile

` cd path/to/Dockerfile `

then, you need to build the docker image

` docker build -t grpc-server . `

finally, you need to create the container, exposing on port 4040, like

` docker run -it -p 4040:4040 grpc-server `

And that's all. you will have an open console with the server's responses


