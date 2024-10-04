FROM node:20

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]

ENV PORT=3000

EXPOSE 3000