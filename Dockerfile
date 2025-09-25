FROM node:18-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Cloud Run will set PORT, default to 4000
ENV PORT=4000
EXPOSE 4000

CMD ["node", "app.js"]
