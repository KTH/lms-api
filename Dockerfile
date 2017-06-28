FROM node:8.1-wheezy

MAINTAINER "#team-e-larande""

COPY ["package.json", "package.json"]
RUN npm install --production --no-optional

# Copy files used by Gulp.
COPY ["config", "config"]
COPY ["package.json", "package.json"]

# Copy source files, so changes does not trigger gulp.
COPY ["simpleCache.js", "simpleCache.js"]
COPY ["app.js", "app.js"]
COPY ["swagger.json", "swagger.json"]
COPY ["server", "server"]

EXPOSE 3001

ENTRYPOINT ["node", "app.js"]
