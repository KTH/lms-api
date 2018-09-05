FROM kthse/kth-nodejs-api:2.4

COPY ["package.json", "package.json"]
COPY ["config", "config"]

# Source files in root
COPY ["simpleCache.js", "simpleCache.js"]
COPY ["app.js", "app.js"]
COPY ["swagger.json", "swagger.json"]
COPY ["logger.js", "logger.js"]

# Source directories
COPY ["server", "server"]

RUN npm install --production --no-optional

EXPOSE 3001

CMD ["node", "app.js"]
