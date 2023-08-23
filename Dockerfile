# Stage 1: Build the Angular Microfront App
FROM node:lts-alpine AS build
ARG APP
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build ${APP}

# Stage 2: Serve the Microfront with NGINX
FROM nginx:1.25.2-alpine
ARG APP
COPY --from=build /app/dist/${APP} /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
