FROM node:10 AS build-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]