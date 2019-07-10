FROM node:10.15.3-alpine AS BUILDER
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN NODE_ENV=production npm run build

FROM nginx:1.15.12-alpine
COPY --from=BUILDER --chown=nginx:nginx /app/build /usr/share/nginx/html
