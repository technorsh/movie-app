FROM node:latest
WORKDIR /movie-app
COPY ["package.json", "package-lock.json", "./"]
RUN yarn install --production
COPY . .
CMD ["npm", "run", "start"]