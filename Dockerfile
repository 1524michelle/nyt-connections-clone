FROM node:20

WORKDIR /app/server

COPY server/package*.json ./

RUN npm install --production

COPY server/ ./

EXPOSE 5010

CMD ["node", "server.js"]
