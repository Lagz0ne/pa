FROM mhart/alpine-node
EXPOSE 8080
WORKDIR /var/app
ADD package.json /var/app/package.json
RUN npm install --production

ADD build /var/app/build
ADD server /var/app/server
ADD .babelrc /var/app

CMD npm run start:production
