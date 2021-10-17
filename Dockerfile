FROM node:12-alpine

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY server/ /app

EXPOSE 4040

RUN ls

CMD ["node","server.js"]


