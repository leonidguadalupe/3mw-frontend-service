# Stage 1
FROM node:12.2.0-alpine as react-build
WORKDIR /app
COPY . ./
WORKDIR /app/src/3mw_frontend_service
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
CMD [ "npm", "run", "build" ]