FROM mhart/alpine-node
EXPOSE 8080
WORKDIR /var/app
ADD package.json /var/app/package.json
RUN npm install --production

ADD build /var/app/build
ADD server /var/app/server
ADD .babelrc /var/app

RUN mkdir -p /var/data/loki
RUN touch /var/data/loki/orders.json
ADD config/users.json /var/data/loki/users.json
VOLUME /var/data/loki

CMD npm run start:production
