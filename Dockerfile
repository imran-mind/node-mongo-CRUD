FROM node:9

#create app directory
WORKDIR /usr/src/app

COPY package*.json

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm" "start"]