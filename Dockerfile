FROM node:16-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn \
      ghostscript

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn prisma generate

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN yarn build

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /usr/src/app

USER pptruser

EXPOSE 3333
CMD ["yarn", "start"]