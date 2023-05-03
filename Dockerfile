# FROM node:16.16.0-alpine
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN chown node:node /usr/src/app
# USER node
# RUN npm run build
# CMD ["npm", "run", "start:dev"]

FROM node:16.16.0-alpine AS build
WORKDIR /app
COPY package*.json tsconfig.build.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.16.0-alpine
RUN apk update && apk add tzdata && apk --no-cache add curl
ENV TZ=Asia/Dhaka
WORKDIR /app
COPY package*.json tsconfig.build.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
CMD ["npm", "run", "start:dev"]