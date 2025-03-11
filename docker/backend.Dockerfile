# docker/backend.Dockerfile
FROM node:16-alpine

# Working directory
WORKDIR /app

# Copy package files
COPY ./backend/package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY ./backend ./

# Expose API port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]