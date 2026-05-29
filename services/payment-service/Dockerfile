FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY src ./src
COPY .env .env

EXPOSE 6000

CMD ["npm", "start"]