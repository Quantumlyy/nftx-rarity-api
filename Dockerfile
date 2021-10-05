FROM node:16-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn global add prisma
RUN yarn install

COPY . .

RUN yarn prisma generate
RUN yarn build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn global add prisma
RUN yarn install --production=true

COPY . .

RUN yarn prisma generate

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start:prod"]
