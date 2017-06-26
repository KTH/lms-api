FROM kthse/kth-nodejs-api:2.3

MAINTAINER KTH Webb "cortina.developers@kth.se"

RUN mkdir -p /npm && \
    mkdir -p /application

RUN apk add bash
RUN npm cache clean -f
RUN npm install -g n
RUN n --version
RUN n latest

# We do this to avoid npm install when we're only changing code
WORKDIR /npm
COPY ["package.json", "package.json"]
RUN npm install --production --no-optional

# Add the code and copy over the node_modules-catalog
WORKDIR /application
RUN cp -a /npm/node_modules /application && \
    rm -rf /npm

# Copy files used by Gulp.
COPY ["config", "config"]
COPY ["package.json", "package.json"]

# Copy source files, so changes does not trigger gulp.
COPY ["app.js", "app.js"]
COPY ["swagger.json", "swagger.json"]
COPY ["server", "server"]

ENV NODE_PATH /application

EXPOSE 3001

ENTRYPOINT ["node", "app.js"]
