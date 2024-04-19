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

# Expose port 5000
EXPOSE 5000

# Define the command to run the app
CMD [ "node", "src/server.js" ]

