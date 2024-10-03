FROM node:20

WORKDIR /michael/UP/IMY220/Project

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

COPY .env .env

ENV PORT=4000

EXPOSE 4000

CMD ["npm", "start", "start:backend"]