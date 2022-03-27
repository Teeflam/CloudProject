FROM node:16-alpine as tsc-builder

WORKDIR /usr/src/app

COPY package-lock.json ./
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm ci
RUN npm run build

FROM node:16-alpine

WORKDIR /usr/src/app

ENV PORT=80

COPY package-lock.json ./
COPY package.json ./
COPY --from=tsc-builder /usr/src/app/dist ./dist

RUN npm ci --production

EXPOSE ${PORT}

CMD ["npm", "start"]