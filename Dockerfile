# Use the official Node.js 20 image.
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 8080
EXPOSE 8080

# Define the command to run the app
CMD [ "node", "src/server.js" ]

