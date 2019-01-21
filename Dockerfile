FROM kthse/kth-nodejs:9.11.0

COPY ["config", "config"]
COPY ["package.json", "package.json"]
COPY ["package-lock.json", "package-lock.json"]

# Source files in root
COPY ["app.js", "app.js"]
COPY ["logger.js", "logger.js"]

# Source directories
COPY ["server", "server"]

RUN npm install --production --no-optional

EXPOSE 3001

CMD ["node", "app.js"]
