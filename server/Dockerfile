FROM node:22.11.0-alpine
# Environment jaha code run hoga

WORKDIR /app 
# apna pura code yahan rakhenge

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000 
# port number

CMD ["npm", "run", "start"]
