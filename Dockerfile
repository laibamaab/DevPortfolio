ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7997

CMD ["npm", "run", "dev"]
