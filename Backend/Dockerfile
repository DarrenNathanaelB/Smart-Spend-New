FROM node:lts-alpine
WORKDIR /app
COPY package*.json . 
RUN npm install -g nodemon && npm install 
COPY . .
EXPOSE 3001
CMD ["nodemon", "index.js"]
