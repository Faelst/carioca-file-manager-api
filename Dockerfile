# build
FROM node:18-alpine AS dist

WORKDIR /tmp/app

COPY . .

RUN npm install --legacy-peer-deps \
    && npm run build

# final image
FROM node:18-alpine

COPY --from=dist /tmp/app /app

EXPOSE 8080

ENTRYPOINT [ "node", "/app/dist/src/main.js" ]
