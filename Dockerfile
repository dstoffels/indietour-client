FROM node:alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . . 
RUN npm run build

FROM node:alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/.next ./.next
COPY public ./public
COPY next.config.js .

CMD ["npm", "run", "start"]