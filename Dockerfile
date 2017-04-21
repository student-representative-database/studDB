# Set base image
FROM node:7.9

MAINTAINER popniten

ADD package.json /tmp/package.json
RUN cd /tmp && npm install

# Create app dir
RUN mkdir /opt/app
RUN cp -a /tmp/node_modules /opt/app

# Set working directory
WORKDIR /opt/app

RUN npm install nodemon typescript ts-node gulp gulp-cli -g && npm install

# Copy node application folder
COPY . /opt/app/

CMD gulp watch

EXPOSE 3000
