# Stage 1: Build the Vue app using Node.js
FROM node:20-alpine as build-stage

COPY ./ ./

RUN npm install
RUN npm run build  # Build the Vue app (outputs to /app/dist)

# Stage 2: Serve the app using NGINX
FROM nginx:alpine as production-stage

# Copy the built files from the Node.js build stage to the NGINX HTML folder
COPY --from=build-stage /dist /usr/share/nginx/html

# Expose port 80 (NGINX default) to serve the app
EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
