FROM node:14.0.0-stretch as builder

ENV NODE_ENV=development

WORKDIR /app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install
# \
#     && mv node_modules ../

COPY . /app

FROM nginx:1.19.5-alpine

#! /bin/sh

COPY ./nginx/app.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/src /usr/share/nginx/html/src
COPY --from=builder /app/index.html /usr/share/nginx/html

EXPOSE 80

# RUN useradd -g 1000 -u 1001 mcfe \
#     && chown -R mcfe /app

# USER mcfe

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
