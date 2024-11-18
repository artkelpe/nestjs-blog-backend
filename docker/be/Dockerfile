FROM node:23

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env /app/

RUN npm run build

CMD [ "npm", "run", "start:dev" ]