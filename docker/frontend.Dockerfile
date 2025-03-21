# docker/frontend.Dockerfile
FROM node:16-alpine as build

# Working directory
WORKDIR /app

# Copy package files
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY ./frontend ./

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]