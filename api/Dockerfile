FROM node:9.6.1

# Create app directory
WORKDIR /usr/src/app

ENV DEV_APP_PORT 4040

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .
RUN npm run build

EXPOSE 4040
CMD [ "npm", "run", "start" ]