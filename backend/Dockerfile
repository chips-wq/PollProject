
FROM node:18-alpine

WORKDIR /usr/src/backend

COPY package*.json .

ENV NODE_ENV production

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

COPY . .

#CMD ["node", "app.js"]
CMD ["npx", "nodemon", "app.js"]
