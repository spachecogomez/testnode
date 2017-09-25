FROM node:latest
WORKDIR /use/app
COPY . .
EXPOSE 8081
ENTRYPOINT ["npm","run","start_express"]